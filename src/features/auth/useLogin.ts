import { useMutation } from '@tanstack/react-query'
import { loginApi } from '../../api/auth.api'
import { useAuthContext } from '../../context/AuthContext'

export const useLogin = () => {
  const { setAccessToken } = useAuthContext()

  return useMutation({
    mutationFn: loginApi,
    onSuccess: res => {
      setAccessToken(res.data.data.accesstoken)
    }
  })
}
