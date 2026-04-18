import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../../features/auth/useLogout'
import { queryClient } from '../../../lib/queryClient'
import DestructiveBtn from '../DestructiveBtn'
import { CiLogout } from 'react-icons/ci'

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
    <DestructiveBtn onClick={handleLogout} disabled={isPending}>
      <CiLogout size={20} />
Log out
    </DestructiveBtn>
  )
}

export default LogoutBtn
