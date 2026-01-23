import { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { refreshApi } from '../../api/auth.api'
import { getMyProfileApi } from '../../api/user.api'

export const useAuthSession = () => {
  const { accessToken, setAccessToken, setUser } = useAuthContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true

    const initSession = async () => {
      try {
        if (!accessToken) {
          const refreshRes = await refreshApi()
          const newToken = refreshRes.data?.accessToken
          // console.log("accessToken fetched" ,newToken)
          if (!newToken) throw new Error('No token');

          setAccessToken(newToken)
        }
        // console.log("access token set",accessToken)

        const meRes = await getMyProfileApi()
        console.log(meRes.data)
        if (!alive) return
        setUser(meRes.data.data)
      } catch (err) {
        console.log(err)
        setAccessToken(null)
        setUser(null)
      } finally {
        if (alive) setLoading(false)
      }
    }

    initSession()

    return () => {
      alive = false
    }
  }, [])

  return { loading }
}
