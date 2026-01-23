import { axiosPrivate } from '../lib/axios/axiosPrivate'

//personal profiles
export const getMyProfileApi = () =>
  axiosPrivate.get('/users/me/profile')

export const getMyStatsApi = () =>
  axiosPrivate.get('/users/me/stats')

export const getMyPostsApi = () =>
  axiosPrivate.get('/users/me/posts')



// user profiles

export const getPublicProfileApi = (username: string) =>
  axiosPrivate.get(`/profiles/${username}`)