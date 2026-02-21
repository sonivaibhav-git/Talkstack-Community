import { useMutation, useQuery } from '@tanstack/react-query'
import {createPostApi, getPersonalFeed, getPostById, getRandomPosts, getSubstackPostsApi} from '../../api/post.api.ts'
import type { CreatePostPayload, CreatePostResponse, FeedMode, UnifiedPost } from './post.types.ts'
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

import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
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