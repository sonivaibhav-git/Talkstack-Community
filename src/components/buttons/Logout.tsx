import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../features/auth/useLogout'
import { queryClient } from '../../lib/queryClient'

interface LogoutBtnProps {
  onClose?: () => void
}

const LogoutBtn = ({ onClose }: LogoutBtnProps) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useLogout()

  const handleLogout = () => {
    mutate(undefined, {
      onSettled: () => {
        queryClient.clear()
        onClose?.()
        navigate('/login', { replace: true })
      }
    })
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className='flex w-full items-center gap-2 text-sm font-semibold text-red-500 bg-red-200 px-4 py-2 transition rounded-xl disabled:opacity-60'
    >
      Log out
    </button>
  )
}

export default LogoutBtn
