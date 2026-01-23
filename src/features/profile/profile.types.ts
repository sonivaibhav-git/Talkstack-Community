export type MyProfile = {
  id: string
  username: string
  bio: string
  avatarUrl: string
}

export type MyStats = {
  followers: number
  following: number
  followingUsers: number
  followingSubstacks: number
  posts: number
  impact: {
    trust: number
    talkscore: number
  }
}

export type MyPost = {
  id: string
  title: string
  substackSlug: string
  imageUrl: string
  voteScore: number
  upvotes: number
  downvotes: number
  createdAt: string
}
