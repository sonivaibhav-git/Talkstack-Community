import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useSubstackProfile } from '../../features/substacks/substack.queries'
import { useSubstackPosts } from '../../features/posts/post.queries'
import NotFound from '../general/NotFound'
import PostCard from '../../components/cards/PostCard'
import SubstackProfileCard from '../../components/cards/SubstackProfileCard'
import Loader from '../../components/skeletons/Loader'

const SubstackProfileInner = () => {
  const { slug } = useParams<{ slug: string }>()

  const {
    data,
    isLoading,
    error
  } = useSubstackProfile(slug!)

  const {
    data: posts,
    isLoading: postsLoading
  } = useSubstackPosts(slug!)

  if (isLoading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Loader />
      </div>
    )
  }

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
      <div className='p-6 text-center text-neutral-600'>
        No data available.
      </div>
    )
  }

  return (
    <div className='w-full h-full grid grid-cols-1 gap-6'>

      {/* Profile Section */}
      <div>
        <SubstackProfileCard data={data} postCount={posts?.length}/>
      </div>

      {/* Posts Section */}
      <div >

        {postsLoading && (
          <div className='w-full flex justify-center items-center py-10'>
            <Loader />
          </div>
        )}

        {!postsLoading && posts?.length === 0 && (
          <div className='text-center text-neutral-500 py-10'>
            No posts in this substack yet.
          </div>
        )}

        {!postsLoading && posts && posts.length > 0 && (
          <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-4 px-1 md:px-10 space-y-4 mb-10'>
            {posts.map(post => (
              <div
                key={post.id}
                className='break-inside-avoid'
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default SubstackProfileInner
