export type PostAuthor = {
  id: string
  username: string
  avatar?: string
}

export type Post = {
  id: string
  title: string
  content: string
  imageUrl: string | null
  externalLink: string | null
  voteScore: number
  createdAt: string
  timeAgo: string
  author: PostAuthor
}

export type SubstackPost = {
  id: string
  title: string
  substackSlug: string
  imageUrl?: string
  authorDto: PostAuthor
  voteScore: number
  upvotes: number
  downvotes: number
  createdAt: string
}

export type CreatePostPayload = {
  title: string
  content: string
  substackSlug: string
  publishNow: boolean
  image?: File
}

export type CreatePostResponse = {
  success: boolean
  message: string
  data: Post
}
