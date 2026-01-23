import { useParams } from 'react-router-dom'
import { usePublicProfile } from '../../features/profile/publicProfile.queries'
import ProfileMeSkeleton from '../../components/skeletons/ProfileMeSkeleton'

const ProfileUsername = () => {
  const { username } = useParams<{ username: string }>()
  const { data, isLoading, isError } = usePublicProfile(username!)

  if (isLoading) return <ProfileMeSkeleton />
  if (isError || !data) return <div>Something went wrong</div>

  const { user, stats, viewer } = data

  return (
    <div className='w-full flex justify-center bg-neutral-100 p-1'>
      <div className='w-full flex flex-col items-center gap-4 p-3 bg-white rounded-3xl shadow-lg md:flex-row md:items-center md:gap-3'>

        {/* Avatar */}
        <div className='flex justify-center items-center w-74'>
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              className='w-full md:w-fit rounded-xl border-white shadow-md object-cover'
            />
          ) : (
            <img
              src='https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'
              className='w-fit h-full rounded-xl border-white shadow-md object-cover'
            />
          )}
        </div>

        {/* Profile info */}
        <div className='w-full flex flex-col flex-wrap text-center justify-center md:items-start items-center gap-5 p-3 md:text-start'>
          <div className='flex flex-col items-center justify-center md:items-start'>
            <h1 className='text-xl font-bold text-neutral-400'>
              u/
              <span className='text-neutral-900 uppercase'>
                {user.username}
              </span>
            </h1>
          </div>

          {/* Bio */}
          <div className='w-full flex flex-col md:flex-row gap-5 justify-between items-center'>
            <p className='text-sm text-neutral-600 leading-relaxed'>
              {user.bio || 'This user prefers mystery over bios.'}
            </p>
          </div>

          {/* Stats */}
          <div className='flex flex-row w-full justify-around items-center rounded-2xl border border-neutral-300 overflow-hidden'>
            <div className='p-4 text-center'>
              <p className='text-lg font-semibold'>
                {stats.impact.talkscore}
              </p>
              <p className='text-xs text-neutral-500'>Talkscore</p>
            </div>

            <div className='p-4 text-center'>
              <p className='text-lg font-semibold'>
                {stats.posts}
              </p>
              <p className='text-xs text-neutral-500'>Posts</p>
            </div>

            <div className='p-4 text-center'>
              <p className='text-lg font-semibold'>
                {stats.followers}
              </p>
              <p className='text-xs text-neutral-500'>Followers</p>
            </div>
          </div>

          {/* Actions */}
          <div className='flex gap-3'>
            {viewer.me && (
              <button className='px-4 py-1 rounded-lg border'>
                Edit Profile
              </button>
            )}

            {!viewer.me && viewer.following && (
              <button className='btn'>
                Unfollow
              </button>
            )}

            {!viewer.me && !viewer.following && (
              <button className='btn'>
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileUsername
