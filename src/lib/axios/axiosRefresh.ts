// lib/axios/axiosRefresh.ts
import axios from 'axios'

export const axiosRefresh = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})