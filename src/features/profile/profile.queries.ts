import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getMyProfileApi,
  getMyStatsApi,
  getMyPostsApi,
  getMyFollowingApi,
  updateMyProfileApi
} from '../../api/user.api'
import type { FollowingItem, MyProfile,MyPost, MyStats, UpdateProfilePayload } from './profile.types'
import { toast } from 'react-toastify'



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


export const useMyFollowing = () =>
  useQuery<FollowingItem[]>({
    queryKey: ['me', 'following'],
    queryFn: async () => (await getMyFollowingApi()).data
  })


  export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      updateMyProfileApi(payload),

    onSuccess: res => {
      toast.success(res.data.action || 'Profile updated')
      queryClient.invalidateQueries({ queryKey: ['me', 'profile'] })
    }
  })
}