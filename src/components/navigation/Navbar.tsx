import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import 'react-loading-skeleton/dist/skeleton.css'
import { useAuthContext } from '../../context/AuthContext'
import PrimaryBtn from '../buttons/PrimaryBtn'
import CreateSubstackModal from '../../pages/substack/CreateSubstackModal'

interface NavbarProps {
  onMenuClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [menuOpen, setMenuOpen] = useState(false)
     const [open, setOpen] = useState(false)

  const handleMenuToggle = () => {
    setMenuOpen(v => !v)
    onMenuClick()
  }
  const { user } = useAuthContext()

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-white flex flex-row'>
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
      <div className='w-full  mx-auto px-3 h-12 flex items-center justify-between '>
        {/* Logo */}
        <Link
          to='/'
          className='flex items-center gap-1 text-2xl text-purple-500 font-bold  lowercase '
        >
          {' '}
          talkstack
        </Link>

        <div className=' w-fit flex items-center gap-2 '>
      

<PrimaryBtn onClick={() => setOpen(true)}>
  New Substack
</PrimaryBtn>

<CreateSubstackModal
  open={open}
  onClose={() => setOpen(false)}
/>

          {user && (
            <Link to='/profile/me' className=' w-fit flex flex-col gap-2'>
              <div className='hidden md:flex  w-full gap-2'>
                <img
                  src={
                    user.avatarUrl ??
                    'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'
                  }
                  alt={user.username}
                  className='w-10 h-10 rounded-full  object-cover self-start'
                  loading='lazy'
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
