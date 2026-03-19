import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { useSubstackProfile } from '../../features/substacks/substack.queries'
import { useSubstackPosts } from '../../features/posts/post.queries'
import NotFound from '../general/NotFound'
import PostCard from '../../components/cards/PostCard'
import SubstackProfileCard from '../../components/cards/SubstackProfileCard'
import Loader from '../../components/skeletons/Loader'
import CreateDiscussionModal from "../../components/cards/CreateDiscussionModal"

const SubstackProfileInner = () => {
  const { slug } = useParams<{ slug: string }>()
const [open, setOpen] = useState(false)
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
      <div className="p-2">
        <SubstackProfileCard data={data} postCount={posts?.length}/>
      </div>

      {/* Posts Section */}
      <div className="p-2" >

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
          <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-4  space-y-4 mb-4'>
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
          <button onClick={() => setOpen(true)} className=" sticky bottom-15 left-full px-5 py-3 flex items-center justify-center font-bold text-2xl bg-neutral-800 text-white rounded-full" >
          +
        </button>

      
      <CreateDiscussionModal
        open={open}
        onClose={() => setOpen(false)}
        substackSlug={slug!}
      />
      </div>
    </div>
  )
}

export default SubstackProfileInner
