import { MdOutlineLogout } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../features/auth/useLogout'


interface LogoutBtnProps {
  onClose?: () => void
}

const LogoutBtn = ({ onClose }: LogoutBtnProps) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useLogout()

  const handleLogout = () => {
    mutate(undefined, {
      onSettled: () => {
        onClose?.()
        navigate('/login', { replace: true })
      }
    })
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className='flex items-center gap-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-60'
    >
      Log out
    </button>
  )
}

export default LogoutBtn
