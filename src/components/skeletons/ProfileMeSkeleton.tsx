// ProfileMeSkeleton.tsx
import Skeleton from 'react-loading-skeleton'

const ProfileMeSkeleton = () => {
  return (
    <div className='w-full flex justify-between bg-neutral-100 p-2 gap-5'>
      <div className='relative w-fit flex flex-col items-center gap-2 p-2 md:p-3 bg-white rounded-3xl shadow-lg md:items-center md:gap-3'>
        <div className='absolute top-2 right-2'>
          <Skeleton circle width={28} height={28} />
        </div>

        <div className=' w-full flex flex-row md:flex-col text-center justify-center md:items-start items-center gap-5 md:text-start'>
          {/* Avatar */}
          <div className=' flex self-center items-center w-fit'>
            <Skeleton width={208} height={208} borderRadius={12} />
          </div>

          {/* Profile info */}
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col items-start justify-center gap-2'>
              <Skeleton width={240} height={28} />
              <Skeleton width={120} height={18} />

              {/* Bio */}
              <div className='w-full flex flex-col md:flex-row gap-5 justify-start items-start'>
                <Skeleton count={2} />
              </div>
            </div>

            {/* Stats */}
            <div className='flex flex-row w-full justify-around items-center rounded-2xl border border-neutral-300 overflow-hidden'>
              <div className='p-4 text-center flex flex-row items-center gap-2 w-full'>
                <Skeleton height={20} width={60} />
              </div>
              <div className='p-4 text-center flex flex-row items-center gap-2 w-full'>
                <Skeleton height={20} width={60} />
              </div>

              <div className='p-4 text-center w-full'>
                <Skeleton height={20} width={60} />
              </div>
            </div>

            <div className='w-full'>
              <Skeleton width={120} height={36} />
            </div>
          </div>
        </div>

        {/* Trust card */}
        <div className='w-full mt-3'>
          <Skeleton height={64} />
        </div>
      </div>
    </div>
  )
}

export default ProfileMeSkeleton
