import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { AuthProvider, useAuthContext } from './context/AuthContext'
import { setupInterceptors } from './lib/axios/interceptors'
import App from './App'
import './index.css'
import { useEffect } from 'react'

const Bootstrap = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken } = useAuthContext()

  useEffect(() => {
    setupInterceptors(() => accessToken, setAccessToken)
  }, [accessToken])

  return children
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Bootstrap>
        <App />
      </Bootstrap>
    </AuthProvider>
  </QueryClientProvider>
)
