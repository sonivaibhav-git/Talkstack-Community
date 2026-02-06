import Skeleton from 'react-loading-skeleton'

export const ProfileSkeleton = () => (
  <div className='hidden md:flex items-center gap-2 border border-neutral-300 rounded-full p-1'>
    <Skeleton circle width={32} height={32} />
    <Skeleton width={80} height={14} />
  </div>
)
