import { useQuery } from '@tanstack/react-query'
import {
  getMyProfileApi,
  getMyStatsApi,
  getMyPostsApi
} from '../../api/user.api'
import type { MyPost, MyProfile, MyStats } from './profile.types'



export const useMyProfile = () =>
  useQuery<MyProfile>({
    queryKey: ['me', 'profile'],
    queryFn: async () => (await getMyProfileApi()).data
  })

export const useMyStats = () =>
  useQuery<MyStats>({
    queryKey: ['me', 'stats'],
    queryFn: async () => (await getMyStatsApi()).data
  })

export const useMyPosts = () =>
  useQuery<MyPost[]>({
    queryKey: ['me', 'posts'],
    queryFn: async () => (await getMyPostsApi()).data
  })
