// import { refreshApi } from '../../api/auth.api'
import {
  useMyFollowing,
  useMyPosts,
  useMyProfile,
  useMyStats
} from '../../features/profile/profile.queries'
import Profilecard from '../../components/cards/Profilecard'
import PostCard from '../../components/cards/PostCard'
import TopPostsGraph from '../../components/cards/TopPostsGraph'
import { ProfileCardSkeleton } from '../../components/skeletons/ProfileCardSkeleton'
import { GraphSkeleton } from '../../components/skeletons/GraphSkeleton'
import PostCardSkeleton from '../../components/skeletons/PostCardSkeleton'
const ProfileMe = () => {
  const profile = useMyProfile()
  const stats = useMyStats()
  const posts = useMyPosts()
  const query = useMyFollowing()

  const hasCriticalError =
    profile.isError || stats.isError

  if (hasCriticalError) {
    return <div className="p-6 text-center">Something went wrong</div>
  }

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-3 relative'>

      {/* RIGHT PANEL */}
      <div className='w-full sticky top-0 left-full order-1 md:order-2 p-1 space-y-2'>

        {/* Profile Card */}
        {profile.isLoading || stats.isLoading ? (
          <ProfileCardSkeleton />
        ) : (
          <Profilecard
            user={profile.data}
            stats={stats.data}
            query={query}
          />
        )}

        {/* Graph */}
        {posts.isLoading ? (
          <GraphSkeleton />
        ) : (
          <TopPostsGraph posts={posts.data} />
        )}

      </div>

      {/* POSTS */}
      <div className='p-1 order-2 md:order-1 w-full col-span-2'>
        <div className='flex flex-col gap-2 mb-10'>

          {posts.isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))
          ) : posts.data?.length ? (
            posts.data.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className='text-neutral-500 text-sm'>
              No posts to show
            </p>
          )}

        </div>
      </div>

    </div>
  )
}

export default ProfileMe
