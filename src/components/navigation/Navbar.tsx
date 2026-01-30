import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { useAuthContext } from '../../context/AuthContext'
// import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ProfileSkeleton } from '../skeletons/ProfileSkeleton'

interface NavbarProps {
  onMenuClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuthContext()

  const handleMenuToggle = () => {
    setMenuOpen(v => !v)
    onMenuClick()
  }

  useEffect(() => {
    console.log('USER UPDATED:', user)
  }, [user])


  return (
    <nav className='sticky top-0 z-50 bg-white border-b border-neutral-300'>
      <div className='w-full mx-auto px-3 h-12 flex items-center justify-start md:justify-between '>
        {/* Mobile sidebar toggle */}
        <button
          onClick={handleMenuToggle}
          className='lg:hidden p-1'
          aria-label='Toggle menu'
        >
          {menuOpen ? (
            <MdClose className='text-2xl text-neutral-800' />
          ) : (
            <FiMenu className='text-xl text-neutral-800' />
          )}
        </button>

        {/* Logo */}
        <Link
          to='/'
          className='flex items-center gap-3 text-2xl font-bold text-neutral-800 lowercase'
        >
         
          TalkStack
        </Link>

        {/* Profile */}
        {user === undefined && <ProfileSkeleton />}

        {user && (
          <Link
            to='/profile/me'
            className='hidden md:flex items-center gap-2 hover:shadow-md border border-neutral-400 rounded-full p-1 pr-2'
          >
            <img
              src={user.avatarUrl}
              alt={user.username}
              className='w-8 h-8 rounded-full border border-neutral-300 object-cover'
              loading='lazy'
            />
            <span className='text-sm font-medium text-neutral-800'>
              {user.displayName}
            </span>
          </Link>
        )}

        {/* {!user && user !== undefined && (
          <Link to='/login' className='btn'>
            Login
          </Link>
        )} */}
      </div>
    </nav>
  )
}

export default Navbar
