import {
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  getPostComments,
  getCommentReplies,
  postComment,
  postReply
} from '../../api/comments.api'

export const usePostComments = (postId: string) =>
  useInfiniteQuery({
    queryKey: ['comments', postId],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) =>
      getPostComments({
        postId,
        limit: 10,
        cursor: pageParam ?? undefined
      }).then(res => res.data),
    getNextPageParam: lastPage =>
      lastPage?.nextCursor ?? undefined
  })

export const useCommentReplies = (commentId: string, enabled: boolean) =>
  useInfiniteQuery({
    queryKey: ['replies', commentId],
    enabled,
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) =>
      getCommentReplies({
        commentId,
        limit: 5,
        cursor: pageParam ?? undefined
      }).then(res => res.data),
    getNextPageParam: lastPage =>
      lastPage?.nextCursor ?? undefined
  })

export const usePostComment = (postId: string) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (content: string) =>
      postComment({ postId, content }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['comments', postId] })
    }
  })
}

export const usePostReply = (commentId: string) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (content: string) =>
      postReply({ commentId, content }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['replies', commentId] })
    }
  })
}
