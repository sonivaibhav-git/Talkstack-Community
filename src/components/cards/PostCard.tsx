import { Link } from 'react-router-dom'
import type { UnifiedPost } from '../../features/posts/post.types'
import { useAuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import VoteButtons from '../buttons/VoteButtons'
import SummarizeButton from '../../summarizer/SummarizeButton'
import { IoMdTrendingDown, IoMdTrendingUp } from 'react-icons/io'
import { MdCallSplit } from 'react-icons/md'
import CommentsSection from '../posts/CommentsSection'
import { CiWarning } from "react-icons/ci";


type Props = {
  post: UnifiedPost
}

const PostCard = ({ post }: Props) => {
  const { user } = useAuthContext()
  if (!user) return null

  const [isExpanded, setIsExpanded] = useState(false)
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)

  // 🆕 NEW STATE
  const [revealed, setRevealed] = useState(false)

  const contentWords = post.content?.trim().split(/\s+/) || []
  const wordLimit = 20
  const isLongContent = contentWords.length > wordLimit

  const displayContent =
    isLongContent && !isExpanded
      ? contentWords.slice(0, wordLimit).join(' ') + '...'
      : post.content?.trim() || ''

  const consensus = post.credibilityResponseDto?.consensus
  // const trustQuality = post.credibilityResponseDto?.trustQuality

  const isWeak = consensus === 'WEAK' && !revealed

  return (
    <div className='w-full mx-auto'>
      <div className='relative p-4 grid gap-2 bg-white rounded-4xl shadow-xl'>

        {/* 🔥 BLUR WRAPPER */}
        <div className={`${isWeak ? 'blur-md pointer-events-none select-none' : ''}`}>
          
          <Link
            to={`/posts/${post.id}`}
            onClick={() => {
              sessionStorage.setItem('lastViewedPostId', post.id)
            }}
          >
            {/* Header */}
            <div className='flex items-center gap-3 text-sm text-neutral-600 mb-6'>
              <img
                src={post.author.avatar || 'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'}
                className='w-8 h-8 rounded-full object-cover'
              />

              <div className='flex flex-col gap-1'>
                <Link
                  to={`/profile/${post.author.username}`}
                  className='hover:underline font-semibold'
                >
                  {post.author.username}
                </Link>
                <span>{post.timeAgo}</span>
              </div>

              <div className='ml-auto'>
                <span
                  className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full ${
                    consensus === 'STRONG'
                      ? 'bg-green-500/20 text-green-600'
                      : consensus === 'WEAK'
                      ? 'bg-red-500/20 text-red-600'
                      : 'bg-yellow-500/20 text-yellow-600'
                  }`}
                >
                  {consensus === 'STRONG' ? (
                    <IoMdTrendingUp />
                  ) : consensus === 'WEAK' ? (
                    <IoMdTrendingDown />
                  ) : (
                    <MdCallSplit />
                  )}
                  {consensus || 'SPLIT'}
                </span>
              </div>
            </div>

            {/* Image */}
            {post.imageUrl && (
              <div className='relative rounded-3xl overflow-hidden'>
                <img
                  src={post.imageUrl}
                  className='w-full h-80 object-cover'
                />
              </div>
            )}

            {/* Content */}
            <div className='mt-6 px-2'>
              <p className='text-xl font-bold text-neutral-800'>
                {post.title}
              </p>

              {post.content && (
                <p className='text-sm text-neutral-600'>
                  {displayContent}
                  {isLongContent && (
                    <button
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        setIsExpanded(!isExpanded)
                      }}
                      className='ml-1 font-medium'
                    >
                      {isExpanded ? 'Less' : 'More'}
                    </button>
                  )}
                </p>
              )}
            </div>
          </Link>
        </div>

        {/* 🚨 OVERLAY */}
        {isWeak && (
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-4xl text-white text-center p-6'>
            
            <p className='text-lg font-semibold mb-2 flex flex-row items-center gap-2 '>
              <CiWarning size={34}/> Low Trust Content
            </p>

            <p className='text-sm text-neutral-300 mb-4'>
              This post may contain unreliable information.
            </p>

            <button
              onClick={() => setRevealed(true)}
              className='px-4 py-2 bg-red-400 rounded-full text-sm hover:bg-red-700 transition'
            >
             View
            </button>
          </div>
        )}

        {/* Footer */}
        <div className='flex justify-between mt-4 px-2'>
          {post.title.length > 50  || post.content.length > 100  ?
          <SummarizeButton title = {post.title} content={post.content}/>
          : " "}
          <button
            onClick={() => setIsCommentsOpen(prev => !prev)}
            className='text-sm text-neutral-600'
          >
            {isCommentsOpen ? 'Hide Comments' : 'Show Comments'}
          </button>
        </div>

        {isCommentsOpen && (
          <CommentsSection postId={post.id} />
        )}

        <div className='absolute bottom-5 right-2'>
          <VoteButtons postId={post.id} />
        </div>
      </div>
    </div>
  )
}

export default PostCard