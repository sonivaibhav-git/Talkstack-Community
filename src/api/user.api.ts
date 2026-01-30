import type { UpdateProfilePayload } from '../features/profile/profile.types'
import { axiosPrivate } from '../lib/axios/axiosPrivate'

//personal profiles
export const getMyProfileApi = () =>
  axiosPrivate.get('/users/me/profile')

export const getMyStatsApi = () =>
  axiosPrivate.get('/users/me/stats')

export const getMyPostsApi = () =>
  axiosPrivate.get('/users/me/posts')

export const getMyFollowingApi = () =>
  axiosPrivate.get('/users/me/following')


export const updateMyProfileApi = (payload: UpdateProfilePayload) => {
  const formData = new FormData()
  formData.append('displayName', payload.displayName)
  formData.append('bio', payload.bio)
  if (payload.avatarFile) {
    formData.append('avatarUrl', payload.avatarFile)
  }
  
  return axiosPrivate.put('/users/me/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}


// user profiles

export const getPublicProfileApi = (username: string) =>
  axiosPrivate.get(`/profiles/${username}`)


export const followUserApi = (username: string) =>
  axiosPrivate.post(`/user/${username}/follow`)

export const unfollowUserApi = (username: string) =>
  axiosPrivate.delete(`/user/${username}/unfollow`)