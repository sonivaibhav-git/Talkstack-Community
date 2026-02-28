import { useParams, Link } from 'react-router-dom'
import { IoMdTrendingDown, IoMdTrendingUp } from 'react-icons/io'
import { usePost } from '../../features/posts/post.queries'
import CommentsSection from '../../components/posts/CommentsSection'
import Loader from '../../components/skeletons/Loader'
import VoteButtons from '../../components/buttons/VoteButtons'

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>()
  const { data: post, isLoading, isError } = usePost(postId!)
  console.log(post);

  if (isLoading)  return (
      <div className='w-full h-full flex justify-center items-center'>  <Loader /></div>
    )
  if (isError || post == null) return <div className='p-6'>Post not found</div>


  
  const concensus = post.credibilityResponseDto?.consensus
  const trustQuality = post.credibilityResponseDto?.trustQuality
  const dissent = post.credibilityResponseDto?.dissent

  return (
  <div className="w-full min-h-full bg-[#ececec] flex ">

    <div className="w-full  bg-[#f4f4f4] shadow-[0_40px_80px_rgba(0,0,0,0.15)] p-4 md:p-6">

      <div className="flex flex-col md:flex-row h-full relative gap-6 mb-10 ">

        {/* LEFT PANEL */}
        <div className=" rounded-4xl flex-1 bg-[#efefef] order-2 md:order-1  p-6 md:p-10 relative shadow-inner ">

          {/* Top Right Tag */}
           <div className='sticky top-6 left-full w-fit'>
                       <span
                         className={`flex items-center gap-1 px-4 py-2 text-xs font-medium rounded-full backdrop-blur ${
                           concensus === 'STRONG'
                             ? 'bg-green-500/20 text-green-600 border border-green-500/30'
                             : concensus === 'WEAK'
                             ? 'bg-red-500/20 text-red-600 border border-red-500/30'
                             : 'bg-yellow-500/20 text-yellow-600 border border-yellow-500/30'
                         }`}
                       >
                         {concensus === 'STRONG' ? (
                           <IoMdTrendingUp />
                         ) : concensus === 'WEAK' ? (
                           <IoMdTrendingDown/>
                         ) : null}
                         {post.credibilityResponseDto?.consensus|| "Not credible"}
                       </span>
                     </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-neutral-900 mb-4 text-wrap wrap ">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 text-sm text-neutral-600 mb-6">
            <img
              src={
                post.author.avatar ||
                'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'
              }
              loading="lazy"
              className="w-8 h-8 rounded-full object-cover"
            />

            <Link
              to={`/profile/${post.author.username}`}
              className="hover:underline"
            >
              u/{post.author.username}
            </Link>

            <span>•</span>
            <span>{post.timeAgo}</span>
          </div>

          {/* Content */}
          <div className="text-neutral-700 leading-relaxed mb-6">
            {post.content}
          </div>

          {/* External link */}
          {post.externalLink && (
            <a
              href={post.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm font-medium text-neutral-900 underline"
            >
              External link →
            </a>
          )}

          {/* Vote Buttons */}
          <div className="mt-8">
            <VoteButtons postId={post.id} />
          </div>

          {/* Comments */}
          <div className="mt-10">
            <CommentsSection postId={postId!} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        {post.imageUrl && (
         <div className="order-1 w-1/2 md:order-2 bg-black shadow-2xl rounded-4xl overflow-hidden max-h-full flex items-center justify-center">
  <img
    src={post.imageUrl}
    alt={post.title}
    className="w-full h-auto object-contain max-h-screen"
    loading="lazy"
  />
</div>
        )}

      </div>
    </div>
  </div>
)
}

export default PostPage
