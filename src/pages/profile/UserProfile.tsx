import { useParams } from 'react-router-dom'
import { usePublicProfile, useUserPosts } from '../../features/profile/publicProfile.queries'
import UserCard from '../../components/cards/UserCard'
import PostCard from '../../components/cards/PostCard'
import PostCardSkeleton from '../../components/skeletons/PostCardSkeleton'
import { ProfileCardSkeleton } from '../../components/skeletons/ProfileCardSkeleton'

const ProfileUsername = () => {
  const { username } = useParams<{ username: string }>()

  const profile = usePublicProfile(username!)
  const posts = useUserPosts(username!)

  // Only block if critical failure
  if (profile.isError) {
    return <div className="p-6 text-center">Something went wrong</div>
  }

  const user = profile.data?.user
  const stats = profile.data?.stats
  const viewer = profile.data?.viewer

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-3 mt-12 md:mt-0'>

      {/* RIGHT SIDE (User Info) */}
      <div className='w-full order-1 md:order-2 relative p-1'>
        {profile.isLoading || !profile.data ? (
          <ProfileCardSkeleton />
        ) : (
          <UserCard user={user!} stats={stats!} viewer={viewer!} />
        )}
      </div>

      {/* LEFT SIDE (Posts) */}
      <div className='p-1 order-2 md:order-1 w-full col-span-2'>
        <div className='flex flex-col gap-2 mb-10'>

          {posts.isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))
          ) : posts.isError ? (
            <p className='text-sm text-neutral-500'>
              Failed to load posts
            </p>
          ) : posts.data?.length ? (
            posts.data.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className='text-sm text-neutral-500'>
              No posts to show
            </p>
          )}

        </div>
      </div>

    </div>
  )
}

export default ProfileUsername
