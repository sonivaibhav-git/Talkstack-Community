import { useParams, Link } from 'react-router-dom'
import { IoMdTrendingUp } from 'react-icons/io'
import { usePost } from '../../features/posts/post.queries'
import CommentsSection from '../../components/posts/CommentsSection'
import Loader from '../../components/skeletons/Loader'

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>()
  const { data: post, isLoading, isError } = usePost(postId!)

  if (isLoading)  return (
      <div className='w-full h-full flex justify-center items-center'>  <Loader /></div>
    )
  if (isError || post == null) return <div className='p-6'>Post not found</div>

  return (
    <div className=' md:w-full flex flex-col items-center md:flex-row h-full'>
      <div className='w-full h-full text-neutral-800 flex flex-col md:flex-row gap-3 justify-between '>
        {post.imageUrl && ( <div className='relative w-full flex flex-col gap-3'>
         
            <div className='relative w-full  overflow-hidden shadow-md'>
              {/* Hero */}
              <img
                src={post.imageUrl}
                alt={post.title}
                className='inset-0 w-fit h-fit object-cover'
                loading='lazy'
              />

              {/* Badge */}
              <span className='absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-white/80 backdrop-blur text-green-700'>
                <IoMdTrendingUp />
                Strong
              </span>
            </div>
       
        </div>   )}
        <div className='w-full p-5 bg-neutral-200  shadow-md'>

          <h1 className='text-2xl font-semibold leading-snug'>{post.title}</h1>
          {/* Author */}
          <div className='flex items-center gap-2 text-sm text-neutral-800'>
            <img
              src={
                post.author.avatar ||
                'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'
                
              }
              loading='lazy'
              className='w-6 h-6 rounded-full object-cover'
            />

            <Link
              to={`/profile/${post.author.username}`}
              className='hover:underline'
            >
              u/{post.author.username}
            </Link>

            <span>•</span>
            <span>{post.timeAgo}</span>
          </div>
          {/* Content */}
          <div className='prose max-w-none mb-6 text-neutral-800'>
            {post.content}
          </div>
          {/* External link */}
          {post.externalLink && (
            <a
              href={post.externalLink}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 font-medium'
            >
              External link →
            </a>
          )}
          <CommentsSection postId={postId!} />
        </div>
      </div>
    </div>
  )
}

export default PostPage
