import type { AxiosRequestConfig } from 'axios'
import { axiosPrivate } from './axiosPrivate'
import { axiosRefresh } from './axiosRefresh'

let isRefreshing = false
let queue: ((token: string) => void)[] = []

let requestInterceptorId: number | null = null
let responseInterceptorId: number | null = null

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean
}

export const setupInterceptors = (
  getToken: () => string | null,
  setToken: (t: string | null) => void
) => {
  if (requestInterceptorId !== null) {
    axiosPrivate.interceptors.request.eject(requestInterceptorId)
  }

  if (responseInterceptorId !== null) {
    axiosPrivate.interceptors.response.eject(responseInterceptorId)
  }

  requestInterceptorId = axiosPrivate.interceptors.request.use(config => {
    const token = getToken()
    config.headers = config.headers ?? {}

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  responseInterceptorId = axiosPrivate.interceptors.response.use(
    res => res,
    async error => {
      const original = error.config as RetryConfig
      const status = error.response?.status

      if ((status !== 401 && status !== 403) || original._retry) {
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise(resolve => {
          queue.push(token => {
            original.headers = original.headers ?? {}
            original.headers.Authorization = `Bearer ${token}`
            resolve(axiosPrivate(original))
          })
        })
      }

      original._retry = true
      isRefreshing = true

      try {
        const res = await axiosRefresh.get('/auth/refresh')
        const newToken = res.data?.accessToken

        if (!newToken) throw new Error('No token')

        setToken(newToken)

        queue.forEach(cb => cb(newToken))
        queue = []

        original.headers = original.headers ?? {}
        original.headers.Authorization = `Bearer ${newToken}`

        return axiosPrivate(original)
      } catch (err) {
        setToken(null)
        queue = []
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
  )
}
