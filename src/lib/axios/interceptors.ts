import type { AxiosRequestConfig } from 'axios'
import { axiosPrivate } from './axiosPrivate'
import { axiosRefresh } from './axiosRefresh'

let isRefreshing = false
let queue: ((token: string) => void)[] = []

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean
}

export const setupInterceptors = (
  getToken: () => string | null,
  setToken: (t: string | null) => void
) => {
  axiosPrivate.interceptors.request.use(config => {
    const token = getToken()
   config.headers = config.headers ?? {}
if (token) {
  config.headers.Authorization = `Bearer ${token}`
}

    return config
  })

  axiosPrivate.interceptors.response.use(
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
            if (original.headers) {
              original.headers.Authorization = `Bearer ${token}`
            }
            resolve(axiosPrivate(original))
          })
        })
      }

      original._retry = true
      isRefreshing = true

      try {
        const res = await axiosRefresh.get('/auth/refresh')

        const newToken = res.data?.accessToken

        setToken(newToken)
        queue.forEach(cb => cb(newToken))
        queue = []

        if (original.headers) {
          original.headers.Authorization = `Bearer ${newToken}`
        }

        return axiosPrivate(original)
      } catch (err) {
        console.log(err)
        setToken(null)
        queue = []
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
  )
}
