{/*import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from '../../context/AuthContext'
import { refreshApi } from '../../api/auth.api'
import {
  getMyProfileApi,
  getMyStatsApi,
  getMyFollowingApi
} from '../../api/user.api'
import {
  getPersonalFeed,
  getRandomPosts
} from '../../api/post.api'
import {
  getAllSubstacksApi,
  getTopSubstacksApi
} from '../../api/substack.api'

export const useAuthSession = () => {
  const { accessToken, setAccessToken, setUser } = useAuthContext()
  const queryClient = useQueryClient()
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

  // 2️⃣ After refresh success, fetch profile then ordered app data
  useEffect(() => {
    if (!accessToken) return

    let alive = true

    const fetchSessionData = async () => {
      try {
        const profileRes = await getMyProfileApi()
        if (!alive) return

        setUser(profileRes.data)
        queryClient.setQueryData(['me', 'profile'], profileRes.data)

        await queryClient.prefetchQuery({
          queryKey: ['me', 'stats'],
          queryFn: async () => (await getMyStatsApi()).data,
          staleTime: 600000,
          gcTime: 1000 * 60 * 15
        })

        await queryClient.prefetchQuery({
          queryKey: ['me', 'following'],
          queryFn: async () => (await getMyFollowingApi()).data,
          staleTime: 600000,
          gcTime: 1000 * 60 * 15
        })

        await queryClient.prefetchInfiniteQuery({
          queryKey: ['home-feed', 'feed'],
          queryFn: async ({ pageParam }) => {
            const [personalPosts, randomPosts] = await Promise.all([
              getPersonalFeed({
                limit: 10,
                cursor: pageParam as string | undefined
              }),
              getRandomPosts({
                limit: 10,
                cursor: pageParam as string | undefined
              })
            ])

            const reference = personalPosts.length === 10 ? personalPosts : randomPosts
            const nextCursor = reference.length === 10 ? reference.at(-1)?.createdAt : undefined

            return {
              personal: personalPosts,
              random: randomPosts,
              nextCursor
            }
          },
          getNextPageParam: lastPage => lastPage.nextCursor,
          staleTime: 1000 * 60 * 10,
          gcTime: 1000 * 60 * 15
        })

        await queryClient.prefetchQuery({
          queryKey: ['substacks', 'top'],
          queryFn: async () => (await getTopSubstacksApi()).data,
          staleTime: 600000,
          gcTime: 1000 * 60 * 15
        })

        await queryClient.prefetchQuery({
          queryKey: ['substacks', 'all'],
          queryFn: async () => (await getAllSubstacksApi()).data,
          staleTime: 600000,
          gcTime: 1000 * 60 * 15
        })
      } catch {
        if (alive) setUser(null)
      } finally {
        if (alive) setLoading(false)
      }
    }

    fetchSessionData()

    return () => {
      alive = false
    }
  }, [accessToken, queryClient, setUser])

  return { loading }
}
*/}

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