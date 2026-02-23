import { useState } from 'react'
import type { PublicProfileResponse } from '../../features/profile/publicProfile.types'
import ActionMenu from '../navigation/ActionMenu'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import UnfollowButton from '../user/UnfollowButton'
import FollowButton from '../user/FollowButton'
import TrustCard from './TrustCard'

function UserCard({ user, stats, viewer }: PublicProfileResponse) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
<div className='w-full sm:w-full max-w-none bg-white rounded-3xl p-2 flex flex-col gap-2 sticky top-2'>
      {/* Menu */}
      <button
        onClick={() => setMenuOpen(true)}
        className='absolute top-3 right-3 p-2 rounded-full hover:bg-neutral-100 transition'
      >
        ⋮
      </button>
      <ActionMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Header */}
      <div className='flex flex-row gap-4 items-start'>

        {/* Avatar */}
        <img
          src={user!.avatarUrl ?? 'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'}
          className='w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl shadow-xl object-cover p-1'
          loading='lazy'
        />

        {/* Meta */}
        <div className='flex flex-col gap-3 text-left  w-full'>

          <div>
            <h1 className='text-xl md:text-2xl font-bold text-neutral-800'>
              {user!.displayName ? user.displayName : user.username}
            </h1>
            <p className='text-sm font-semibold text-neutral-400 lowercase'>
              u/{user!.username}
            </p>
          </div>

          <p className='text-sm text-neutral-600 leading-relaxed'>
            {user!.bio || 'This user prefers mystery over bios.'}
          </p>

          {/* Actions */}
          <div className='flex gap-3 w-full justify-center sm:justify-start'>
            {viewer.me ? (
              <button
                onClick={() => navigate('/settings/profile')}
                className='flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-200 hover:bg-neutral-300 transition'
              >
                <AiOutlineEdit size={20} />
                Edit Profile
              </button>
            ) : viewer.following ? (
              <UnfollowButton username={user.username} />
            ) : (
              <FollowButton username={user.username} />
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-3 border border-neutral-200 rounded-2xl overflow-hidden text-center'>
        <Stat label='Posts' value={stats!.posts} />
        <Stat label='Followers' value={stats!.followers} />
        <Stat label='Following' value={stats!.following} />
      </div>

      {/* Trust */}
      <TrustCard
        trust={stats!.impact.trust}
        talkscore={Math.floor(stats!.impact.talkscore)}
      />
    </div>
  )
}

export default UserCard

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className='p-4 text-center'>
      <p className='text-lg font-semibold'>{value}</p>
      <p className='text-xs text-neutral-500'>{label}</p>
    </div>
  )
}