import type { ForgotPasswordOtpRequest, ResetPasswordRequest } from '../features/auth/auth.types'
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



export const sendForgotPasswordOtp = async (
  payload: ForgotPasswordOtpRequest
) => {
  const { data } = await axiosPrivate.post(
    "/auth/forgot-password/otp",
    payload
  )
  return data
}

export const resetForgotPassword = async (
  payload: ResetPasswordRequest
) => {
  const { data } = await axiosPrivate.post(
    "/auth/forgot-password/reset",
    payload
  )
  return data
}
