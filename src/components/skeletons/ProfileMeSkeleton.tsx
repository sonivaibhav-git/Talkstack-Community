// ProfileMeSkeleton.tsx
import Skeleton from 'react-loading-skeleton'

const ProfileMeSkeleton = () => {
  return (
    <div className='w-full flex justify-center bg-neutral-100 p-1'>
      <div className='w-full flex flex-col items-center gap-4 p-3 bg-white rounded-3xl shadow-lg md:flex-row md:items-center md:gap-3'>
        
        {/* Avatar */}
        <div className='flex justify-center items-center w-74'>
          <Skeleton width={160} height={160} borderRadius={16} />
        </div>

        {/* Profile info */}
        <div className='w-full flex flex-col text-center justify-center md:items-start items-center gap-5 p-3 md:text-start'>
          
          {/* Username */}
          <Skeleton width={320} height={48} />

          {/* Bio */}
          <Skeleton count={2} />

          {/* Stats */}
          <div className='flex flex-row w-full justify-around items-center rounded-2xl border border-neutral-300 overflow-hidden'>
            <div className='p-4 w-full'>
              <Skeleton height={40} />
            </div>
            <div className='p-4 w-full'>
              <Skeleton height={40} />
            </div>
            <div className='p-4 w-full'>
              <Skeleton height={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileMeSkeleton
