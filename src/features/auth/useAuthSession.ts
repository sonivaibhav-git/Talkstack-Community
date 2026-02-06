import { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { refreshApi } from '../../api/auth.api'
import { getMyProfileApi } from '../../api/user.api'

export const useAuthSession = () => {
  const { accessToken, setAccessToken, setUser } = useAuthContext()
  const [loading, setLoading] = useState(true)

  // 1️⃣ Ensure access token exists
  useEffect(() => {
    let alive = true

    const ensureToken = async () => {
      try {
        if (!accessToken) {
          const res = await refreshApi()
          const token = res.data?.accessToken
          if (!token) throw new Error('No token')
          if (alive) setAccessToken(token)
        }

      } catch {
        setAccessToken(null)
        setUser(null)
        setLoading(false)
      }
    }

    ensureToken()

    return () => {
      alive = false
    }
  }, [])

  // 2️⃣ Fetch user AFTER token is set
  useEffect(() => {
    if (!accessToken) return

    let alive = true

    const fetchUser = async () => {
      try {
        const res = await getMyProfileApi()
        if (alive) setUser(res.data)
      } catch {
        setUser(null)
      } finally {
        if (alive) setLoading(false)
      }
    }

    fetchUser()

    return () => {
      alive = false
    }
  }, [accessToken])

  return { loading }
}
