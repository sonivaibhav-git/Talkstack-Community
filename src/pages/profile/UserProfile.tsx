import { useParams, useNavigate } from 'react-router-dom'
import { usePublicProfile } from '../../features/profile/publicProfile.queries'
import TrustCard from '../../components/cards/TrustCard'
import UnfollowButton from '../../components/user/UnfollowButton'
import FollowButton from '../../components/user/FollowButton'
import { AiOutlineEdit } from 'react-icons/ai'
import ActionMenu from '../../components/navigation/ActionMenu'
import { useState } from 'react'
import Loader from '../../components/skeletons/Loader'

const ProfileUsername = () => {
  const { username } = useParams<{ username: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError } = usePublicProfile(username!)
  const [menuOpen, setMenuOpen] = useState(false)

  if (isLoading) return (
      <div className='w-full h-full flex justify-center items-center'>  <Loader /></div>
    )
  if (isError || !data) return <div>Something went wrong</div>

  const { user, stats, viewer } = data

  console.log(user)
  return (
    <div className='w-sm md:w-full flex flex-wrap wrap bg-neutral-100 p-2 gap-5'>
      <div className='relative w-fit md:w-fit flex flex-col items-center gap-2 p-2 md:p-3 bg-white rounded-3xl shadow-lg  md:items-center md:gap-3'>
        <div className=' w-full flex flex-row md:flex-col   text-center justify-center md:items-start items-center gap-5 md:text-start'>
          {/* Avatar */}
          <div className=' flex self-center items-center w-fit'>
            {user!.avatarUrl ? (
              <div className='flex flex-row md:flex-col rounded-2xl overflow-hidden'>
                <img
                  src={user!.avatarUrl ?? 'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'}
                  className='w-52 border-white shadow-md object-cover object-center'
                  loading='lazy'
                />{' '}
              </div>
            ) : (
              <div className='flex flex-col'>
                <img
                  src='https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'
                  className='w-48 h-48 border-white shadow-md object-cover object-center'
                  loading='lazy'
                />
              </div>
            )}
          </div>
          <div className='absolute top-2 right-2 self-end  '>
            <button
              onClick={() => setMenuOpen(true)}
              className='p-1 hover:bg-neutral-400 text-neutral-900 font-bold  transition'
            >
              ⋮
            </button>

            <ActionMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
          </div>

          {/* Profile info */}
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col items-start justify-center gap-2'>
              <div className='flex flex-col items-start justify-center md:items-start'>
                <h1 className='text-2xl font-bold text-neutral-800'>
                  {user!.displayName ? user.displayName : user.username}
                </h1>
                <p className='text-md font-semibold text-neutral-400 lowercase'>
                  u/{user!.username}
                </p>
              </div>

              {/* Bio */}
              <div className='w-full flex flex-col md:flex-row gap-5 justify-start items-start'>
                <p className='text-sm text-neutral-600 leading-relaxed'>
                  {user!.bio || 'This user prefers mystery over bios.'}
                </p>
              </div>
            </div>
            {/* Stats */}
            <div className='flex flex-row w-full justify-around items-center rounded-2xl border border-neutral-300 overflow-hidden'>
              <div className='p-4 text-center flex flex-row items-center gap-2'>
                <div>
                  <p className='text-lg font-semibold'>{stats!.posts}</p>
                  <p className='text-xs text-neutral-500'>Posts</p>
                </div>
              </div>
              <div className='p-4 text-center flex flex-row items-center gap-2'>
                <div>
                  <p className='text-lg font-semibold'>{stats!.followers}</p>
                  <p className='text-xs text-neutral-500'>Followers</p>
                </div>
              </div>

              <div className='p-4 text-center'>
                <p className='text-lg font-semibold'>{stats!.following}</p>
                <p className='text-xs text-neutral-500'>Following</p>
              </div>
            </div>
            {/* Actions */}
            <div className='flex gap-3 w-full'>
  {viewer.me ? (
    <button
      onClick={() => navigate('/settings/profile')}
      className='px-4 py-1 w-full md:w-fit text-neutral-900 flex flex-row items-center gap-2'
    >
      <AiOutlineEdit size={24} />
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

        <TrustCard
          trust={stats!.impact.trust}
          talkscore={Math.floor(stats!.impact.talkscore)}
        />
      </div>
      
    </div>
  )
}

export default ProfileUsername
