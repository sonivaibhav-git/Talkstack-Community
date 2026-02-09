import { axiosPrivate } from '../lib/axios/axiosPrivate'
import { axiosPublic } from '../lib/axios/axiosPublic'

export const loginApi = (payload: {
  username: string
  password: string
}) =>
  axiosPublic.post('/auth/login', payload)

export const registerApi = (payload: {
  username: string
  email: string
  password: string
}) =>
  axiosPublic.post('/auth/register', payload)

export const logoutApi = () =>
  axiosPrivate.post('/auth/logout')

export const refreshApi = () =>
  axiosPublic.get('/auth/refresh')
