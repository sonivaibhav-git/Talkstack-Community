// components/AuthGuard.tsx
import type { ReactNode } from 'react'
import { useAuthSession } from './useAuthSession'
export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { loading } = useAuthSession() // runs refresh & sets token

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        Checking session…
      </div>
    )
  }

  return <>{children}</>
}
