import type { ReactNode } from 'react'
import { useAuthSession } from './useAuthSession'
import Loader from '../../components/skeletons/Loader'
export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { loading } = useAuthSession() // runs refresh & sets token

  if (loading) {
    return (
     <Loader />
    )
  }

  return <>{children}</>
}
