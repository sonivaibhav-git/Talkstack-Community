export type MyProfile = {
  id: string
  username: string
  displayName:string
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
  authorDto: AuthorDto
  voteScore: number
  upvotes: number
  downvotes: number
  createdAt: string
}

export type FollowingType = 'USER' | 'SUBSTACK'

export type FollowingItem = {
  id: string
  type: FollowingType
  username: string
  avatar: string
}

export type UpdateProfilePayload = {
  displayName: string
  bio: string
  avatarFile: File | null
}

export type Profile = {
  id: string
  username: string
  displayName: string
  bio: string
  avatarUrl: string
}


export type AuthorDto = {
  id: string
  username: string
  avatar: string
}

export type PostItem = {
  id: string
  title: string
  substackSlug: string
  imageUrl: string
  authorDto: AuthorDto
  voteScore: number
  upvotes: number
  downvotes: number
  createdAt: string
}

export type Viewer = {
  me: boolean
  following: boolean
}