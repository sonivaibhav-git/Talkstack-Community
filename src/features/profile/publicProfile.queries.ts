// src/features/profile/profile.public.queries.ts

import { useQuery } from '@tanstack/react-query'
import { getPublicProfileApi, getUserPostsApi } from '../../api/user.api'
import type { PublicProfileResponse } from './publicProfile.types'
import type { UnifiedPost } from '../posts/post.types'


export const publicProfileKeys = {
  all: ['profile'] as const,
  byUsername: (username: string) =>
    [...publicProfileKeys.all, username] as const,
}

export const usePublicProfile = (username: string) =>
  useQuery<PublicProfileResponse>({
    queryKey: publicProfileKeys.byUsername(username),
    queryFn: async () => {
      const res = await getPublicProfileApi(username)
      return res.data
    },
    enabled: !!username,
    staleTime:600000,
    gcTime:1000*60*15
  })


  
  export const useUserPosts = (username:string) =>
    useQuery<UnifiedPost[]>({
      queryKey: ['me', 'posts'],
      queryFn: async () => (await getUserPostsApi(username)).data,
      staleTime:600000,
      gcTime:1000*60*15
    })
  