// src/features/profile/profile.public.queries.ts

import { useQuery } from '@tanstack/react-query'
import { getPublicProfileApi } from '../../api/user.api'
import type { PublicProfileResponse } from './publicProfile.types'


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
  })
