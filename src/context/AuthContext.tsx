import { createContext, useContext, useMemo, useState } from 'react'

type User = {
  id: string
  username: string
  email: string
}

type AuthContextType = {
  accessToken: string | null
  user: User | null
  isAuthenticated: boolean
  setAccessToken: (token: string | null) => void
  setUser: (user: User | null) => void
}
const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const value = useMemo(
    () => ({
      accessToken,
      user,
      isAuthenticated: !!accessToken && !!user,
      setAccessToken,
      setUser
    }),
    [accessToken, user]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('AuthContext missing')
  return ctx
}
