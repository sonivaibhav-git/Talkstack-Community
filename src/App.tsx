import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import 'react-loading-skeleton/dist/skeleton.css'

import './index.css'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Layout from './layouts/Layout'
import NotFound from './pages/general/NotFound'
import Settings from './pages/general/Settings'
import ProfileMe from './pages/profile/ProfileMe'
import { useAuthSession } from './features/auth/useAuthSession'
import UserProfile from './pages/profile/UserProfile'
import SubstackProfile from './pages/substack/SubstackProfile'
import ExploreSubstacks from './pages/substack/ExploreSubstacks'
import { AuthGuard } from './features/auth/AuthGuard'
import EditProfile from './pages/profile/EditProfile'
// import { AuthGuard } from './features/auth/AuthGuard'

export default function App () {
  useAuthSession()
  console.log('useAuthSession mounted')

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* App layout */}
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile/me' element={<ProfileMe />} />
            <Route path='/profile/:username' element={<UserProfile />} />

            <Route
              path='/settings/profile'
              element={
                <AuthGuard>
                  <EditProfile />
                </AuthGuard>
              }
            />

            <Route path='/substack/:slug' element={<SubstackProfile />} />
            <Route path='/explore' element={<ExploreSubstacks />} />
            <Route path='/settings' element={<Settings />} />
            {/* Fallback */}
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
