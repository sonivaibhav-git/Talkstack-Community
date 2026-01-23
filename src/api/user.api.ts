import { axiosPrivate } from '../lib/axios/axiosPrivate'

export const getMyProfileApi = () =>
  axiosPrivate.get('/users/me/profile')

export const getMyStatsApi = () =>
  axiosPrivate.get('/users/me/stats')

export const getMyPostsApi = () =>
  axiosPrivate.get('/users/me/posts')
