import { Link } from 'react-router-dom'
import {
  IoHomeOutline,
  IoCompassOutline,
  IoSettingsOutline,
  IoDocumentOutline,
  IoCreateOutline,
  IoAddSharp
} from 'react-icons/io5'
import { GoCommentDiscussion } from 'react-icons/go'
import { type ReactNode } from 'react'
import LogoutBtn from '../buttons/delete/Logout'
import BackButton from '../buttons/BackButton'
import { useAuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import Footer from "./Footer"
import UserCardSkeleton from '../cards/UserCardSkeleton'
import CreateSubstackModal from '../../pages/substack/CreateSubstackModal'

type SidebarProps = {
  open: boolean
  onClose?: () => void
}

export default function Sidebar ({ open }: SidebarProps) {
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      {open && <div className='sticky inset-0 bg-black/40 z-40 md:hidden' />}

      <aside className={`
        fixed top-0 left-0 z-40
        h-[calc(100vh)]
        md:w-72 w-60
        bg-[#f4f4f5] md:bg-[#f4f4f5]
        px-3 py-4
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>

        <BackButton/>

        {/* Profile Card */}
        {user ? (
          <Link to='/profile/me' className='block mb-6'>
            <div className='bg-white rounded-2xl p-4 shadow-sm  flex flex-row gap-2 items-center text-start'>
              
              <img
                src={user.avatarUrl ?? 'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'}
                alt={user.username?? " "}
                className='w-16 h-16 rounded-xl object-cover shadow-md'
              />
              <div className="flex flex-col">
                <h1 className='mt-2 text-sm font-semibold'>
                  {user.displayName }
                 </h1>

                <p className='text-xs text-neutral-500'>
                  @{user.username}
                </p>
                <p className='text-xs text-neutral-400 mt-1 line-clamp-2'>
                {user.bio}
              </p>
              </div>
              

              
            </div>
          </Link>
        ) : <UserCardSkeleton/>}

        <nav className='flex flex-col justify-between h-[70%]'>

          {/* MAIN */}
          <div className="space-y-4">

            <SidebarSection title="Profile">
              <NavItem to="/" icon={<IoHomeOutline />} label="Home" active />
              <NavItem to="/explore" icon={<IoCompassOutline />} label="Explore" />
              <NavItem to="/posts/create" icon={<IoCreateOutline />} label="Create Post" />
              <button className=' w-full text-sm flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 hover:text-black' onClick={() => setOpenModal(true)}> 
                <span className='text-lg '><IoAddSharp /></span>  New Substack </button>
            </SidebarSection>

            {/* GENERAL */}
            <SidebarSection title="General">
              <NavItem to="/settings" icon={<IoSettingsOutline />} label="Settings" />
              <NavItem to="/" icon={<IoDocumentOutline />} label="Drafts"  />
              <NavItem to="/" icon={<GoCommentDiscussion />} label="Feedback" />
            </SidebarSection>
              <LogoutBtn />
              <Footer />
          </div>
        </nav>

      

      </aside>

      <CreateSubstackModal
  open={openModal}
  onClose={() => setOpenModal(false)}
/>
    </>
  )
}

type SectionProps = {
  title: string
  children: ReactNode
}

function SidebarSection({ title, children }: SectionProps) {
  return (
    <div>
      <h2 className="px-2 mb-2 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
        {title}
      </h2>

      <div className="bg-white rounded-2xl p-2 shadow-sm border border-neutral-200 space-y-1">
        {children}
      </div>
    </div>
  )
}

type NavItemProps = {
  to: string
  icon: ReactNode
  label: string
  badge?: string
  active?: boolean
}

function NavItem ({ to, icon, label, badge, active }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`
        flex items-center justify-between px-3 py-2 rounded-xl text-sm
        transition-all duration-200
        ${active 
          ? 'bg-neutral-100 text-black font-semibold' 
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'}
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
      </div>

      {badge && (
        <span className="text-xs bg-neutral-200 px-2 py-0.5 rounded-md">
          {badge}
        </span>
      )}
    </Link>
  )
}