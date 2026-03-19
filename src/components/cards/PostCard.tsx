import { Link } from 'react-router-dom'
import type { UnifiedPost } from '../../features/posts/post.types'
import { useAuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import VoteButtons from '../buttons/VoteButtons'
import SummarizeButton from '../../summarizer/SummarizeButton'
import { IoMdTrendingDown, IoMdTrendingUp } from 'react-icons/io'
import { MdCallSplit } from "react-icons/md";

// import { extractKeywords } from '../../features/keywords/extractKeywords'

type Props = {
  post: UnifiedPost
}
const PostCard = ({ post }: Props) => {
  const { user } = useAuthContext()
  if (!user) {
    return null
  }
  console.log(post)
  const [isExpanded, setIsExpanded] = useState(false)

  const contentWords = post.content?.trim().split(/\s+/) || []
  const wordLimit = 20
  const isLongContent = contentWords.length > wordLimit

  const displayContent =
    isLongContent && !isExpanded
      ? contentWords.slice(0, wordLimit).join(' ') + '...'
      : post.content?.trim() || ''


// const title = post?.title || '';
const content = post?.content || '';

// const keywords = extractKeywords(title, content);
  const consensus = post.credibilityResponseDto?.consensus
  // const trustQuality = post.credibilityResponseDto?.trustQuality
  // const dissent = post.credibilityResponseDto?.dissent

  return (
    <div className=' w-full  mx-auto '>
      <div className='p-4  bg-white rounded-4xl shadow-xl relative '>
        <Link
          to={`/posts/${post.id}`}
          onClick={() => {
            sessionStorage.setItem('lastViewedPostId', post.id)
          }}
          className='block shadow-inner bg-[#f4f4f4]  p-2 rounded-3xl'
        >
          {/* Author */}
          <div className='flex items-center gap-3 text-sm text-neutral-600 mb-6'>
            <img
              src={
                post.author.avatar ||
                'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'
              }
              loading='lazy'
              className='w-8 h-8 rounded-full object-cover'
            />
            <div className='flex flex-col gap-1 '>
              <Link
              to={`/profile/${post.author.username}`}
              className='hover:underline font-semibold'
            >
              {post.author.username}
            </Link>
            <span>{post.timeAgo}</span></div>
         
            <div className='sticky top-6 left-full w-fit'>
              <span
                className={`flex w-24 items-center gap-1 px-4 py-2 text-xs text-center font-medium rounded-full backdrop-blur ${
                  consensus === 'STRONG'
                    ? 'bg-green-500/20 text-green-600 border border-green-500/30'
                    : consensus === 'WEAK'
                    ? 'bg-red-500/20 text-red-600 border border-red-500/30'
                    : 'bg-yellow-500/20 text-yellow-600 border border-yellow-500/30'
                }`}
              >
                {consensus === 'STRONG' ? (
                  <IoMdTrendingUp />
                ) : consensus === 'WEAK' ? (
                  <IoMdTrendingDown />
                ) : <MdCallSplit />}
                {consensus || 'SPLIT'}
            
              </span>
            </div>
          </div>

          {/* Image Card */}
          {post.imageUrl && (
            <div className='relative rounded-3xl overflow-hidden shadow-lg'>
              <img
                src={post.imageUrl}
                className='w-full h-80 object-cover'
                loading='lazy'
                alt={post.title || 'Post image'}
              />

              {/* Bottom gradient */}
              <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent' />

            </div>
          )}

          {/* Details Section */}
          <div className='mt-6 px-2'>
            <div className='flex items-center justify-between mb-3'>
              <div>
                <p className='text-xl font-bold text-neutral-800'>
                  {post.title}
                </p>
              </div>
            </div>

            {post.content && (
              <p className='text-sm text-neutral-600 leading-relaxed'>
                {displayContent}
                {isLongContent && (
                  <button
                    type='button'
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      setIsExpanded(!isExpanded)
                    }}
                    className='ml-1 text-neutral-900 font-medium'
                  >
                    {isExpanded ? ' Less' : ' More'}
                  </button>
                )}
              </p>
            )}


             {/* {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10">
              {keywords.map((k) => (
                <span
                  key={k.keyword}
                  className="px-4 py-1 text-xs  bg-neutral-300 text-neutral-600 rounded-full"
                >
                  #{k.keyword}
                </span>
              ))}
            </div>
          )} */}
          </div>
        </Link>

        {/* Footer */}
        <div className='flex items-center justify-between mt-6 px-2'>

          { content.trim().length > 200 && 
          <SummarizeButton title={post.title} content={post.content} /> 
          }
          <VoteButtons postId={post.id} />
        </div>
      </div>
    </div>
  )
}

export default PostCard
