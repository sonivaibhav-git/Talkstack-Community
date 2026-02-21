import React from 'react'
import { useNavigate } from 'react-router-dom'
import ActionMenu from '../navigation/ActionMenu'
import Modal from '../lists/Modal'
import List from '../lists/List'
import TrustCard from './TrustCard'
import { CiEdit } from "react-icons/ci";
import type { Profile as User, MyStats as Stats} from '../../features/profile/profile.types'
import SecondaryBtn from '../buttons/SecondaryBtn'

type ProfileCardProps = {
  user: User
  stats: Stats
  query:any
}

function Profilecard ({ user, stats, query }:ProfileCardProps) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [followingOpen, setFollowingOpen] = React.useState(false)

  return (
    <div className='w-full h-fit bg-white rounded-3xl p-2 md:p-2 flex flex-col gap-6 relative'>
      {/* Menu */}
      <button
        onClick={() => setMenuOpen(true)}
        className='absolute top-3 right-3 p-2 rounded-full hover:bg-neutral-100 transition'
      >
        ⋮
      </button>
      <ActionMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Header */}
      <div className='flex flex-col sm:flex-row gap-4 items-center sm:items-start'>
        {/* Avatar */}
        {user.avatarUrl && <img
          src={user.avatarUrl ?? 'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'}
          className='w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl shadow-xl object-cover  p-1'
          loading='lazy'
        />}
        

        {/* Meta */}
        <div className='flex flex-col gap-3 text-center sm:text-left w-full'>
          <div>
            <h1 className='text-xl md:text-2xl font-bold text-neutral-800'>
              {user.displayName ?? user.username}
            </h1>
            <p className='text-sm font-semibold text-neutral-400 lowercase'>
              u/{user.username}
            </p>
          </div>

          <p className='text-sm text-neutral-600 leading-relaxed'>
            {user.bio ?? 'This user prefers mystery over bios.'}
          </p>

          <SecondaryBtn
            onClick={() => navigate('/settings/profile')}
          >
            <CiEdit />
            Edit Profile
          </SecondaryBtn>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-3 border border-neutral-200 rounded-2xl overflow-hidden text-center'>
        <Stat label='Posts' value={stats.posts} />
        <Stat label='Followers' value={stats.followers} />
        <div
          onClick={() => setFollowingOpen(true)}
          className='cursor-pointer hover:bg-neutral-100 transition'
        >
          <Stat label='Following' value={stats.following} />
        </div>
      </div>

      {/* Trust */}
      <TrustCard
        trust={stats.impact.trust}
        talkscore={Math.floor(stats.impact.talkscore)}
      />

      {/* Following modal */}
      <Modal open={followingOpen} onClose={() => setFollowingOpen(false)}>
        <List
          query={query}
          followingUsers={stats.followingUsers}
          followingSubstacks={stats.followingSubstacks}
          onClose={() => setFollowingOpen(false)}
        />
      </Modal>
    </div>
  )
}


export default Profilecard

function Stat ({ label, value }: { label: string; value: number }) {
  return (
    <div className='p-4 text-center'>
      <p className='text-lg font-semibold'>{value}</p>
      <p className='text-xs text-neutral-500'>{label}</p>
    </div>
  )
}
