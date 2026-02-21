import { Link } from 'react-router-dom'
import {
  IoHomeOutline,
  IoCompassOutline,
  IoTrendingUp,
  IoSettingsOutline,
  IoDocumentOutline,
  IoCreateOutline
} from 'react-icons/io5'
import { GoCommentDiscussion } from 'react-icons/go'
import type { ReactNode } from 'react'
import LogoutBtn from '../buttons/Logout'

type SidebarProps = {
  open: boolean
  onClose?: () => void
}

export default function Sidebar ({ open }: SidebarProps) {
  return (
    <>
      {open && <div className='fixed inset-0 bg-black/40 z-40 md:hidden' />}

      <aside
        className={`
    fixed top-12 left-0 z-40
    h-[calc(100vh-3rem)]
    w-54 
    bg-white md:bg-neutral-100 border-r-2 border-neutral-200
    transform transition-transform duration-300
    ${open ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0
  `}
      >
        <nav className='flex flex-col h-fit py-4 justify-between'>
          <div className='flex flex-col gap-3 px-2'>
            {/* Main */}
            <div className='hidden md:block pb-3 border-b border-neutral-300'>
              <NavItem to='/' icon={<IoHomeOutline />} label='Home' />
              <NavItem
                to='/explore'
                icon={<IoCompassOutline />}
                label='Explore'
              />
              <NavItem to='/trending' icon={<IoTrendingUp />} label='Popular' />
              <NavItem
                to='/posts/create'
                icon={<IoCreateOutline />}
                label='Create Post'
              />
            </div>

            {/* Secondary */}
            <div className='pb-3 border-b border-neutral-300'>
              <NavItem
                to='/settings'
                icon={<IoSettingsOutline />}
                label='Settings'
              />
              <NavItem to='/' icon={<IoDocumentOutline />} label='Drafts' />
              <NavItem to='/' icon={<GoCommentDiscussion />} label='Feedback' />
            </div>
            <LogoutBtn />
          </div>
        </nav>
      </aside>
    </>
  )
}

type NavItemProps = {
  to: string
  icon: ReactNode
  label: string
}

function NavItem ({ to, icon, label }: NavItemProps) {
  return (
    <Link
      to={to}
      className='flex items-center gap-3 px-3 py-2 rounded-xl
                 text-neutral-600 hover:text-purple-600 hover:bg-purple-50 transition'
    >
      <span className='text-xl'>{icon}</span>
      <span className='text-sm font-medium'>{label}</span>
    </Link>
  )
}
