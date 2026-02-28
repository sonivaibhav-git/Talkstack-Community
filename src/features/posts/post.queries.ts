import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {createPostApi, getPersonalFeed, getPostById, getRandomPosts, getSubstackPostsApi, votePost} from '../../api/post.api.ts'
import type { CreatePostPayload, CreatePostResponse, FeedMode, UnifiedPost } from './post.types.ts'
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const usePost = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
    gcTime:1000*60*15
  })
}
export const useSubstackPosts = (slug: string) =>
  useQuery({
    queryKey: ['substack-posts', slug],
    queryFn: () => getSubstackPostsApi(slug),
    enabled: !!slug,
    gcTime:1000*60*15
  })

  export const useCreatePost = () => {
  return useMutation<
    CreatePostResponse,
    Error,
    CreatePostPayload
  >({
    mutationFn: createPostApi
  })
}


const PAGE_SIZE = 10;

export function useInfiniteHomeFeed(mode: FeedMode = 'feed') {
  const query = useInfiniteQuery({
    queryKey: ['home-feed'],
    // mode removed from key

    queryFn: async ({ pageParam }): Promise<{
      personal: UnifiedPost[];
      random: UnifiedPost[];
      nextCursor?: string;
      
    }> => {

      const [personalPosts, randomPosts] = await Promise.all([
        getPersonalFeed({
          limit: PAGE_SIZE,
          cursor: pageParam as string | undefined,
        }),
        getRandomPosts({
          limit: PAGE_SIZE,
          cursor: pageParam as string | undefined,
        }),
      ]);

      const reference = personalPosts.length === PAGE_SIZE
        ? personalPosts
        : randomPosts;

      const nextCursor =
        reference.length === PAGE_SIZE
          ? reference.at(-1)?.createdAt
          : undefined;

      return {
        personal: personalPosts,
        random: randomPosts,
        nextCursor,
      };
    },

    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) => lastPage.nextCursor,

    staleTime: 1000 * 60 * 10,
    gcTime:1000*60*15
  });

  const posts = useMemo(() => {
    if (!query.data) return [];

    return query.data.pages.flatMap(page =>
      mode === 'feed' ? page.personal : page.random
    );
  }, [query.data, mode]);

  return {
    posts,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    hasNextPage: !!query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
    
  };
}

// votes

export const useVote = (postId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: votePost,

    onMutate: async ({ type }) => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] })

      const previous = queryClient.getQueryData<any>(['post', postId])

      queryClient.setQueryData(['post', postId], (old: any) => {
        if (!old) return old

        const delta = type === 'up' ? 1 : -1

        return {
          ...old,
          voteCount: old.voteCount + delta
        }
      })

      return { previous }
    },

    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['post', postId], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
    }
  })
}