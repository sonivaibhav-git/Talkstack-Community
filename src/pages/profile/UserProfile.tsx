import { useParams } from 'react-router-dom'
import { usePublicProfile, useUserPosts } from '../../features/profile/publicProfile.queries'
import Loader from '../../components/skeletons/Loader'
import UserCard from '../../components/cards/UserCard'
import PostCard from '../../components/cards/PostCard'

const ProfileUsername = () => {
  const { username } = useParams<{ username: string }>()
  const posts = useUserPosts(username!)
  const { data, isLoading, isError } = usePublicProfile(username!)


  if (isLoading || posts.isLoading) return (
      <div className='w-full h-full flex justify-center items-center'>  <Loader /></div>
    )
  if (isError || !data ||posts.isError) return <div>Something went wrong</div>

  const { user, stats, viewer } = data

  
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-3 '>
      <div className=' w-full order-1 md:order-2 relative p-1'>
        <UserCard user={user} stats={stats} viewer={viewer} />
      </div>
      <div className='p-1 order-2 md:order-1 w-full h-fit gap-2  col-span-2 '>
        <div className=' flex flex-col gap-2 mb-10'>
          {posts.data?.length ? (
            posts.data.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <p>No posts to show</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileUsername
