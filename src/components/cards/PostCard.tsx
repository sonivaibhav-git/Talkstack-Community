import { Link } from 'react-router-dom'
import type { UnifiedPost } from '../../features/posts/post.types'
import { VscCommentDiscussion } from 'react-icons/vsc'
import { useAuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import VoteButtons from '../buttons/VoteButtons'

type Props = {
  post: UnifiedPost
}
const PostCard = ({ post }: Props) => {
  const { user } = useAuthContext()
  if (!user) {
    return null 
  }

  const [isExpanded, setIsExpanded] = useState(false)

  const contentWords = post.content?.trim().split(/\s+/) || []
  const wordLimit = 20
  const isLongContent = contentWords.length > wordLimit

  const displayContent = isLongContent && !isExpanded
    ? contentWords.slice(0, wordLimit).join(' ') + '...'
    : post.content?.trim() || ''

  return (
    <div className="relative group w-full h-fit rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300">
      <Link to={`/posts/${post.id}`} className="">
        {/* Header */}
        <div className="flex w-full flex-col items-start gap-2 p-4 bg-white/70 backdrop-blur-md">
          <div className="flex flex-row sm:justify-between md:justify-start gap-2 w-full items-center">
            {post.authorDto ? (
              <Link
                to={`/profile/${post.authorDto.username}`}
                className="hover:underline flex flex-row gap-2 items-center"
              >
                <img
                  src={post.authorDto.avatar ?? 'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'}
                  className="w-6 h-6 rounded-full object-cover"
                  loading="lazy"
                  alt=""
                />
                <p className="text-sm text-neutral-600 hover:text-purple-600 font-medium">
                  @{post.authorDto.username}
                </p>
              </Link>
            ) : (
              <div className="flex flex-row gap-2 items-center">
                <img
                  src="https://i.ibb.co/F4qtygsQ/profile-Pic.jpg"
                  className="w-6 h-6 rounded-full object-cover"
                  loading="lazy"
                  alt=""
                />
                <p className="text-sm text-neutral-500 font-medium">
                  {user.username}
                </p>
              </div>
            )}

            <span className="text-xs text-neutral-500">
             • {post.timeAgo || new Date(post.createdAt).toLocaleDateString()}
            </span>
            
          </div>

          <h3 className="font-semibold text-lg line-clamp-2 text-neutral-800">
            {post.title}
          </h3>

          {/* Content with Read More */}
          {post.content && (
            <div className="w-full text-neutral-700 text-[15px] leading-relaxed">
              {displayContent}
              {isLongContent && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()           // ← important! prevent navigation to post page
                    e.stopPropagation()
                    setIsExpanded(!isExpanded)
                  }}
                  className="ml-1 text-purple-600 hover:text-purple-800 font-medium transition-colors"
                >
                  {isExpanded ? ' Read Less' : ' Read More'}
                </button>
              )}
            </div>
          )}

          {/* External link */}
          {post.externalLink && (
            <div className="w-full">
              <h2
              
                className="text-blue-600 hover:underline text-sm "
                onClick={(e) => e.stopPropagation()} // prevent card click navigation
              >
                {post.externalLink}
              </h2>
            </div>
          )}

          {/* Image */}
          {post.imageUrl && (
            <div className="w-full h-96 overflow-hidden relative mt-3 rounded-xl">
              <img
                src={post.imageUrl}
                className="w-full h-full rounded-xl object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                alt={post.title || 'Post image'}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>
          )}
        </div>
      </Link>

      {/* Footer */}
      <div className="flex flex-row items-center justify-between gap-3 px-4 py-3 bg-white/80 backdrop-blur-md border-t border-neutral-100"> 
      <VoteButtons postId={post.id} />
        
        <button className="text-neutral-600 hover:text-purple-600 transition">
          <VscCommentDiscussion size={22} />
        </button>
      </div>
    </div>
  )
}

export default PostCard