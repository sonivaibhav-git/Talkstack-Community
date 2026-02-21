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
import UserProfile from './pages/profile/UserProfile'
import SubstackProfile from './pages/substack/SubstackProfile'
import ExploreSubstacks from './pages/substack/ExploreSubstacks'
import EditProfile from './pages/profile/EditProfile'
import PostPage from './pages/posts/PostPage'
import CreatePost from './pages/posts/CreatePost'
import { AuthProvider } from './context/AuthContext'
import { AuthGuard } from './features/auth/AuthGuard'
import { useAuthSession } from './features/auth/useAuthSession'
import EditSubstackProfile from './pages/substack/EditSubstackProfile'
import ForgotPassword from './pages/auth/ForgotPassword'

function AppInner () {
  useAuthSession()

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        {/* App layout */}
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile/me' element={<ProfileMe />} />
          <Route path='/profile/:username' element={<UserProfile />} />
          <Route path='/posts/:postId' element={<PostPage />} />
          <Route path='/posts/create' element={<CreatePost />} />

          <Route
            path='/settings/profile'
            element={
              <AuthGuard>
                <EditProfile />
              </AuthGuard>
            }
          />
          <Route path='/substacks/:slug/edit' element={
            <AuthGuard><EditSubstackProfile /></AuthGuard>} />


          <Route path='/substack/:slug' element={<SubstackProfile />} />
          <Route path='/explore' element={<ExploreSubstacks />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </QueryClientProvider>
  )
}
