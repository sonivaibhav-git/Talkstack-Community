import { useMutation, useQuery } from '@tanstack/react-query'
import {createPostApi, getPostById, getSubstackPostsApi} from '../../api/post.api.ts'
import type { CreatePostPayload, CreatePostResponse } from './post.types.ts'
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