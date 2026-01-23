import { useMutation } from '@tanstack/react-query'
import { logoutApi } from '../../api/auth.api'
import { useAuthContext } from '../../context/AuthContext'
import { queryClient } from '../../lib/queryClient'

export const useLogout = () => {
  const { setAccessToken } = useAuthContext()

  return useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      setAccessToken(null)
      queryClient.clear()
    }
  })
}
