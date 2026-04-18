export interface Author {
  id: string
  username: string
  avatar: string
}

export interface Answer {
  id: string
  content: string
  author: Author
  upvotes: number
  downvotes: number
  createdAt: string
}

export interface Discussion {
  id: string
  title: string
  description: string
  externalLink?: string
  author: Author
  createdAt: string
  answerCount: number
  answers: Answer[]
}
export interface Question {
  id: string
  title: string
  content:string
  authorUsername:string
  description: string
  externalLink?: string
  author: Author
  createdAt: string
  answers: Answer[]
}

export interface CreateDiscussionPayload {
  title: string
  description: string
  substackSlug: string
  externalLink?: string
}