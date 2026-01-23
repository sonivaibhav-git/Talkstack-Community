import { refreshApi } from "../../api/auth.api"
import { useMyPosts, useMyProfile, useMyStats } from "../../features/profile/profile.queries"

const ProfileMe = () => {
  refreshApi()
  const profile = useMyProfile()
  const stats = useMyStats()
  // const posts = useMyPosts()

  if (profile.isLoading || stats.isLoading
    //  || posts.isLoading
    )
    return <div>Loading...</div>

  if (profile.isError ||
     stats.isError 
    //  || posts.isError
    )
    return <div>Something went wrong</div>

  return (
   <div className='w-full flex justify-center bg-neutral-100 p-1'>
  <div className='w-full flex flex-col items-center gap-4 p-3 bg-white rounded-3xl shadow-lg md:flex-row md:items-center md:gap-3'>
    {/* Avatar */}
    <div className='flex justify-center items-center w-74'>
      {profile.data!.avatarUrl ? (
        <img
          src={profile.data!.avatarUrl}
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
    <div className='w-full flex flex-col flex-wrap  text-center justify-center md:items-start items-center gap-5 p-3 md:text-start'>
      <div className='flex flex-col items-center justify-center md:items-start'>
        <h1 className='text-[9vh] font-bold text-neutral-400'>
          u/ <span className= "text-neutral-900 uppercase" >{profile.data!.username}</span>
        </h1>
        {/* <p className='text-sm text-neutral-500'>
          u/{profile.data!.username}
        </p> */}
      </div>

      {/* Bio */}
      <div className='w-full flex flex-col md:flex-row gap-5 justify-between items-center'>
        <p className='text-sm text-neutral-600 leading-relaxed'>
          {profile.data!.bio ||
            'Product designer who focuses on simplicity & usability.'}
        </p>
      </div>

      {/* Stats */}
      <div className='flex flex-row w-full justify-around items-center rounded-2xl border border-neutral-300 overflow-hidden'>
        <div className='p-4 text-center'>
          <p className='text-lg font-semibold'>
            {stats.data!.impact.talkscore}
          </p>
          <p className='text-xs text-neutral-500'>Talkscore</p>
        </div>

        <div className='p-4 text-center'>
          <p className='text-lg font-semibold'>
            {stats.data!.posts}
          </p>
          <p className='text-xs text-neutral-500'>Posts</p>
        </div>

        <div className='p-4 text-center'>
          <p className='text-lg font-semibold'>
            {stats.data!.followers}
          </p>
          <p className='text-xs text-neutral-500'>Followers</p>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default ProfileMe
