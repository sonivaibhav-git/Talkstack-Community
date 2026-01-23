import { useMutation } from '@tanstack/react-query'
import { registerApi } from '../../api/auth.api'
import { useAuthContext } from '../../context/AuthContext'

export const useRegister = () => {
  const { setAccessToken } = useAuthContext()

  return useMutation({
    mutationFn: registerApi,
    onSuccess: res => {
      // If backend logs user in immediately
      if (res.data?.data?.accesstoken) {
        setAccessToken(res.data.data.accesstoken)
      }
    }
  })
}
