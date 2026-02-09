import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useSubstackProfile } from '../../features/substacks/substack.queries'
import NotFound from '../general/NotFound'
import { useSubstackPosts } from '../../features/posts/post.queries'
import PostCard from '../../components/cards/PostCard'
import SubstackProfileCard from '../../components/cards/SubstackProfileCard'
import Loader from '../../components/skeletons/Loader'

const SubstackProfileInner = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, error } = useSubstackProfile(slug!)
  const { data: posts, isLoading: postsLoading } = useSubstackPosts(slug!)
  if (isLoading)
     return (
      <div className='w-full h-full flex justify-center items-center'>  <Loader /></div>
    )
  if (error) {
    const err = error as AxiosError
    if (err.response?.status === 404) {
      return <NotFound />
    }
    return (
      <div className='p-6 text-center text-purple-600'>
        Failed to load substack. Try again later.
      </div>
    )
  }

  if (!data) {
    return (
      <div className='p-6 text-center text-neutral-600'>No data available.</div>
    )
  }
  {
    postsLoading && 
      <div className='w-full h-full flex justify-center items-center'>  <Loader /></div>
  }

  {
    !postsLoading && posts?.length === 0 && (
      <div className='text-neutral-500'>No posts in this substack yet.</div>
    )
  }
  return (
  <div className='w-full h-full grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-2 p-2 bg-neutral-200'>
    {/* Profile Section */}
    <div className='order-1 md:order-2'>
      <SubstackProfileCard data={data} />
    </div>

    {/* Posts Section */}
    <div className='order-2 md:order-1 md:col-span-2'>
      <div className='flex flex-col w-full h-fit gap-2 mb-5'>
        {posts?.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  </div>
)

}

export default SubstackProfileInner
