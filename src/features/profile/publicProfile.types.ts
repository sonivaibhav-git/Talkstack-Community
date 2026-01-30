// src/features/profile/profile.public.types.ts

export type PublicProfileUser = {
  id: string
  username: string
  displayName:string
  bio: string
  avatarUrl: string
}

export type PublicProfileStats = {
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

export type PublicProfileViewer = {
  canEdit: boolean
  me: boolean
  following: boolean
}

export type PublicProfileResponse = {
  user: PublicProfileUser
  stats: PublicProfileStats
  viewer: PublicProfileViewer
}
