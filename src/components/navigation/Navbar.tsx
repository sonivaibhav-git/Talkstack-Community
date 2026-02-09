import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import 'react-loading-skeleton/dist/skeleton.css'

interface NavbarProps {
  onMenuClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [menuOpen, setMenuOpen] = useState(false)
 

  const handleMenuToggle = () => {
    setMenuOpen(v => !v)
    onMenuClick()
  }

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-neutral-100 border-b border-neutral-300'>

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
          className='flex items-center gap-1 text-2xl text-purple-500 font-bold  lowercase border-r-2 border-neutral-400'
        >
             {/* <img className='w-6 self-center rounded-lg' src="https://i.ibb.co/RWgQGVG/Vector.jpg" /> */}
             talkstack
        </Link>

        
        {/* 
        {!user && user !== undefined && (
          <Link to='/login' className='btn'>
            Login
          </Link>
        )} */}
      </div>

     
    </nav>
  )
}

export default Navbar
