import { refreshApi } from '../../api/auth.api'
import {
  useMyFollowing,
  useMyPosts,
  useMyProfile,
  useMyStats
} from '../../features/profile/profile.queries'

import Profilecard from '../../components/cards/Profilecard'
import PostCard from '../../components/cards/PostCard'
import Loader from '../../components/skeletons/Loader'

const ProfileMe = () => {
  refreshApi()

  const profile = useMyProfile()
  const stats = useMyStats()
  const posts = useMyPosts()
  const query = useMyFollowing()

  if (
    profile.isLoading ||
    stats.isLoading ||
    posts.isLoading ||
    query.isLoading
  ) {
     return (
      <div className='w-full h-full flex justify-center items-center'>  <Loader /></div>
    )
  }

  if (
    profile.isError ||
    stats.isError ||
    posts.isError ||
    query.isError ||
    !profile.data ||
    !stats.data
  ) {
    return <div>Something went wrong</div>
  }

  return (
    <div className='w-full grid sm:grid-col-1 md:grid-cols-3 gap-5 md:gap-2 p-2'>
      <div className='col-span-2 order-2 md:order-1'>
        <div className='flex flex-col w-full h-fit gap-2'>
          {posts.data?.length
            ? posts.data.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            : <p>No posts to show</p>}
        </div>
      </div>

      <div className='w-full col-span-1 order-1 md:order-2'>
        <Profilecard
          user={profile.data}
          stats={stats.data}
          query={query}
        />
      </div>
    </div>
  )
}

export default ProfileMe
