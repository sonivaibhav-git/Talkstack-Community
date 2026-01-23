import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { useAuthContext } from '../../context/AuthContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ProfileSkeleton } from '../skeletons/ProfileSkeleton'


interface NavbarProps {
  onMenuClick: () => void
}
 
const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [menuOpen, setMenuOpen] = useState(false)
const { user } = useAuthContext();
  const handleMenuToggle = () => {
    setMenuOpen(v => !v)
    onMenuClick()
  }

 useEffect(() => {
  console.log('USER UPDATED:', user)
}, [user])
  
  

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-300">
      <div className="w-full mx-auto px-3 h-12 flex items-center justify-between">

        {/* Mobile sidebar toggle */}
        <button
          onClick={handleMenuToggle}
          className="lg:hidden p-1"
          aria-label="Toggle menu"
        >
          {menuOpen
            ? <MdClose className="text-2xl text-neutral-800" />
            : <FiMenu className="text-xl text-neutral-800" />}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-lg font-bold text-neutral-900"
        >
          <img
            src="https://i.ibb.co/ZR95Wbxg/Talkstack-Logo.png"
            alt="TalkStack"
            className="w-8 h-8 rounded-full"
          />
          TalkStack
        </Link>

      {/* Profile */}
{user === undefined && <ProfileSkeleton />}

{user && (
  <Link
    to="/profile/me"
    className="hidden md:flex items-center gap-2 border border-neutral-400 rounded-full p-1"
  >
    <img
      src={user.avatarUrl ?? 'https://i.pinimg.com/736x/15/fd/0b/15fd0b20dffb3c2da9f5ea662f6be75a.jpg'}
      alt={user.username}
      className="w-8 h-8 rounded-full border border-neutral-300 object-cover"
      loading="lazy"
    />
    <span className="text-sm font-medium text-neutral-800">
      {user.username}
    </span>
  </Link>
)}



      </div>
    </nav>
  )
}

export default Navbar
