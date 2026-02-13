import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import 'react-loading-skeleton/dist/skeleton.css'
import { useAuthContext } from '../../context/AuthContext'

interface NavbarProps {
  onMenuClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [menuOpen, setMenuOpen] = useState(false)
 

  const handleMenuToggle = () => {
    setMenuOpen(v => !v)
    onMenuClick()
  }
   const { user } = useAuthContext()
  console.log(user)

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-neutral-100 border-b border-neutral-300'>

      <div className='w-full  mx-auto px-3 h-12 flex items-center justify-start md:justify-between '>
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
          className='flex items-center gap-1 text-2xl text-purple-500 font-bold  lowercase '
        > talkstack
        </Link>

         <div className=' w-fit flex items-end '>{user && (
              
          <Link
            to='/profile/me'
            className=' w-fit flex flex-col gap-0 p-2'
          >
            <div className='hidden md:flex btn  px-2 py-2 w-full gap-2'>
              <img
              src={user.avatarUrl}
              alt={user.username}
              className='w-6 h-6 rounded-lg  object-cover self-start'
              loading='lazy'
            />
            <span className='text-sm font-semibold '>
              {user.displayName}
            </span>
            </div>
         
          </Link>
        )}</div>
      </div>
    </nav>
  )
}

export default Navbar
