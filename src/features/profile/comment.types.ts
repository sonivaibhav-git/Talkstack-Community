export type CommentAuthor = {
  id: string
  username: string
  avatar: string | null
}

export type Comment = {
  id: string
  postId: string
  content: string
  author: CommentAuthor | null
  deleted: boolean
  createdAt: string
  upvotes: number
  downvotes: number
  replies: string[]
}

export type PaginatedResponse<T> = {
  data: T[]
  nextCursor?: string
}
