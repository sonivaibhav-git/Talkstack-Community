// src/features/substack/substack.types.ts

export type SubstackAdmin = {
  id: string
  username: string
}

export type SubstackViewer = {
  canEdit: boolean
  me: boolean
  following: boolean
}

export type SubstackProfile = {
  id: string
  name: string
  description: string
  slug: string
  admin: SubstackAdmin
  subscriberCount: number
  logoUrl: string
  bannerUrl: string
  viewer: SubstackViewer
}
