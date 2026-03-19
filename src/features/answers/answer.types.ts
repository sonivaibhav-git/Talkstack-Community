import { Author } from '../discussions/discussion.types'

export interface Answer {
  id: string
  content: string
  author: Author
  upvotes: number
  downvotes: number
  createdAt: string
}

export interface VoteResponse {
  upvotes: number
  downvotes: number
}