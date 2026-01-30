import { refreshApi } from '../../api/auth.api'
import {
  useMyFollowing,
  useMyPosts,
  useMyProfile,
  useMyStats
} from '../../features/profile/profile.queries'
import ProfileMeSkeleton from '../../components/skeletons/ProfileMeSkeleton'
import { useNavigate } from 'react-router-dom'
import ActionMenu from '../../components/navigation/ActionMenu'
import TrustCard from '../../components/cards/TrustCard'
import { useState } from 'react'
import List from '../../components/lists/List'
import Post from '../../components/cards/Post'

const ProfileMe = () => {
  refreshApi()
  const profile = useMyProfile()
  console.log(profile)
  const stats = useMyStats()
  const query = useMyFollowing()
  // const posts = useMyPosts()

  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  if (
    profile.isLoading ||
    stats.isLoading ||
    query.isLoading
    //  || posts.isLoading
  )
    return <ProfileMeSkeleton />
  if (
    profile.isError ||
    stats.isError ||
    query.isError
    //  || posts.isError
  )
    return <div>Something went wrong</div>

  return (
    <div className='w-full flex flex-wrap wrap bg-neutral-100 p-2 gap-5'>
      <div className='relative w-full md:w-fit flex flex-col items-center gap-2 p-2 md:p-3 bg-white rounded-3xl shadow-lg  md:items-center md:gap-3'>
        <div className=' w-full flex flex-row md:flex-col   text-center justify-center md:items-start items-center gap-5 md:text-start'>
          {/* Avatar */}
          <div className=' flex self-center items-center w-fit'>
            {profile.data!.avatarUrl ? (
              <div className='flex flex-row md:flex-col rounded-2xl overflow-hidden'>
                <img
                  src={profile.data!.avatarUrl}
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
                  {profile.data!.displayName}
                </h1>
                <p className='text-md font-semibold text-neutral-400 lowercase'>
                  {profile.data!.username}
                </p>
              </div>

              {/* Bio */}
              <div className='w-full flex flex-col md:flex-row gap-5 justify-start items-start'>
                <p className='text-sm text-neutral-600 leading-relaxed'>
                  {profile.data!.bio || 'This user prefers mystery over bios.'}
                </p>
              </div>
            </div>
            {/* Stats */}
            <div className='flex flex-row w-full justify-around items-center rounded-2xl border border-neutral-300 overflow-hidden'>
             
              <div className='p-4 text-center flex flex-row items-center gap-2'>
            
                <div>
                  <p className='text-lg font-semibold'>{stats.data!.posts}</p>
                  <p className='text-xs text-neutral-500'>Posts</p>
                </div>
              </div>
              <div className='p-4 text-center flex flex-row items-center gap-2'>
                <div>
                  <p className='text-lg font-semibold'>
                    {stats.data!.followers}
                  </p>
                  <p className='text-xs text-neutral-500'>Followers</p>
                </div>
              </div>

              <div className='p-4 text-center'>
                <p className='text-lg font-semibold'>{stats.data!.following}</p>
                <p className='text-xs text-neutral-500'>Following</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/settings/profile')}
              className='px-4 py-1 rounded-lg border w-full md:w-fit '
            >
              Edit Profile
            </button>
          </div>
        </div>

        <TrustCard
          trust={stats.data!.impact.trust}
          talkscore={Math.floor(stats.data!.impact.talkscore)}
        />
      </div>
      {/* <Post data={posts.data ?? []} /> */}

      <List query={query} followingSubstacks= {stats.data!.followingSubstacks} followingUsers={stats.data!.followingUsers} />
    </div>
    // 
  )
}

export default ProfileMe
