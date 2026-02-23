import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {createPostApi, getPersonalFeed, getPostById, getRandomPosts, getSubstackPostsApi, votePost} from '../../api/post.api.ts'
import type { CreatePostPayload, CreatePostResponse, FeedMode, UnifiedPost } from './post.types.ts'
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const usePost = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId
  })
}
export const useSubstackPosts = (slug: string) =>
  useQuery({
    queryKey: ['substack-posts', slug],
    queryFn: () => getSubstackPostsApi(slug),
    enabled: !!slug
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
  const fetcher = mode === 'feed' ? getPersonalFeed : getRandomPosts;

  const query = useInfiniteQuery({
    queryKey: ['home-feed', mode],

    queryFn: async ({ pageParam }): Promise<{ posts: UnifiedPost[]; nextCursor?: string }> => {
      const posts = await fetcher({
        limit: PAGE_SIZE,
        cursor: pageParam as string | undefined,
      });

      const nextCursor = posts.length === PAGE_SIZE ? posts.at(-1)?.createdAt : undefined;

      return { posts, nextCursor };
    },

    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) => lastPage.nextCursor,

    staleTime: 1000 * 60 * 5, // 5 min
  });

  const posts = useMemo(() => query.data?.pages.flatMap(p => p.posts) ?? [], [query.data]);

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