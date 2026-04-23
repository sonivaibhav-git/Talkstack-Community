import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useSubstackProfile } from '../../features/substacks/substack.queries'
import { useSubstackPosts } from '../../features/posts/post.queries'
import NotFound from '../general/NotFound'
import PostCard from '../../components/cards/PostCard'
import SubstackProfileCard from '../../components/cards/SubstackProfileCard'
import DiscussionItem from '../../components/substack/DiscussionItem'
import { SubstackProfileSkeleton } from '../../components/skeletons/SubstackProfileSkeleton'
import PostCardSkeleton from '../../components/skeletons/PostCardSkeleton'
import DiscussionItemSkeleton from '../../components/skeletons/DiscussionItemSkeleton'

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

  if (error) {
    const err = error as AxiosError
    if (err.response?.status === 404) return <NotFound />

    return (
      <div className='p-6 text-center text-purple-600'>
        Failed to load substack. Try again later.
      </div>
    )
  }

  return (
    <div className='w-full h-full grid grid-cols-1 gap-2'>

      {/* Profile Section */}
      <div className="p-2 ">
        {isLoading || !data ? (
          <SubstackProfileSkeleton />
        ) : (
          <SubstackProfileCard data={data} postCount={posts?.length} />
        )}
      </div>

      {/* Content Section */}
      <div className="p-2 w-full grid grid-cols-1 lg:grid-cols-3 gap-2">

        {/* Posts */}
        <div className='col-span-1 lg:col-span-2 order-2 md:order-1'>
          <h1 className="text-black font-bold text-2xl mb-2">Posts</h1>

          {postsLoading ? (
            <div className='space-y-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          ) : posts?.length === 0 ? (
            <div className='text-center text-neutral-500 py-10'>
              No posts in this substack yet.
            </div>
          ) : (
            <div className='columns-1 gap-4 space-y-2 mb-2'>
              {posts?.map(post => (
                <div key={post.id} className='break-inside-avoid'>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Discussions */}
        <div className='col-span-1 order-1 md:order-2'>
          <h1 className="text-black font-bold text-2xl mb-2">Discussions</h1>

          {isLoading ? (
            <DiscussionItemSkeleton />
          ) : (
            <DiscussionItem slug={slug || ''} />
          )}
        </div>

      </div>
    </div>
  )
}

export default SubstackProfileInner
