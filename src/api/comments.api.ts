import type { Comment, PaginatedResponse } from '../features/profile/comment.types'
import { axiosPrivate } from '../lib/axios/axiosPrivate'


export const getPostComments = ({
  postId,
  limit,
  cursor
}: {
  postId: string
  limit: number
  cursor?: string
}) =>
  axiosPrivate.get<PaginatedResponse<Comment>>(
    `/posts/${postId}/comments`,
    {
      params: {
        limit,
        cursor
      }
    }
  )

export const getCommentReplies = ({
  commentId,
  limit,
  cursor
}: {
  commentId: string
  limit: number
  cursor?: string
}) =>
  axiosPrivate.get<PaginatedResponse<Comment>>(
    `/comments/${commentId}/replies`,
    {
      params: {
        limit,
        cursor
      }
    }
  )

export const postComment = ({
  postId,
  content
}: {
  postId: string
  content: string
}) =>
  axiosPrivate.post(`/posts/${postId}/comments`, {
    content
  })

export const postReply = ({
  commentId,
  content
}: {
  commentId: string
  content: string
}) =>
  axiosPrivate.post(`/comments/${commentId}/reply`, {
    content
  })
