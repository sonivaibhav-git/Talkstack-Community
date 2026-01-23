import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { AuthProvider, useAuthContext } from './context/AuthContext'
import { setupInterceptors } from './lib/axios/interceptors'
import App from './App'
import './index.css'

const Bootstrap = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken } = useAuthContext()
  setupInterceptors(() => accessToken, setAccessToken)
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
