import { useState } from 'react'
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
    <nav className='md:hidden fixed top-0 right-0 z-50 w-full md:w-fit bg-white flex flex-row gap-2 items-center px-2'>
      <button
        onClick={handleMenuToggle}
        className='lg:hidden '
        aria-label='Toggle menu'
      >
        {menuOpen ? (
          <MdClose className='text-2xl text-neutral-800' />
        ) : (
          <FiMenu className='text-xl text-neutral-800' />
        )}
      </button>
       <h1 className="text-purple-500 sticky top-0 z-100  w-full font-bold text-2xl">talkstack</h1>
    </nav>
  )
}

export default Navbar
