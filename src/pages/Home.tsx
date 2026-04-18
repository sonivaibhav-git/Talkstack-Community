import { useEffect, useRef, useState, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteHomeFeed } from '../features/posts/post.queries'
import PostCard from '../components/cards/PostCard'
import { profileMeCall } from '../call/profile'
import { substackPageCall } from '../call/substack'
import { MdOutlineWhatshot } from "react-icons/md";
import PostCardSkeleton from '../components/skeletons/PostCardSkeleton'


type FeedType = 'feed' | 'dissent'

export default function Home () {
  const postRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const hasRestoredScroll = useRef(false)
  const [activeFeed, setActiveFeed] = useState<FeedType>('feed')

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: '300px 0px'
  })

  const {
    posts,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteHomeFeed('feed')

  // Infinite scroll
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  // Scroll restoration
  useEffect(() => {
    if (hasRestoredScroll.current) return

    const lastViewedPostId = sessionStorage.getItem('lastViewedPostId')
    if (!lastViewedPostId) return

    const el = postRefs.current[lastViewedPostId]

    if (el) {
      hasRestoredScroll.current = true
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'auto', block: 'center' })
      })
      sessionStorage.removeItem('lastViewedPostId')
    }
  }, [posts])

  // API calls
  profileMeCall()
  substackPageCall()
  // Filtering logic
  const filteredPosts = useMemo(() => {
    if (activeFeed === 'dissent') {
      return posts.filter(
        post => post.credibilityResponseDto?.dissent === true
      )
    }

    return posts.filter(
      post => post.credibilityResponseDto?.dissent !== true
    )
  }, [posts, activeFeed])

  return (
    <main className='relative bg-neutral-100 grid grid-cols-1 md:grid-cols-3'>
      
      {/* LEFT SECTION */}
      <div className='col-span-2 relative max-w-5xl'>
        {isLoading ? (
          <div className='mt-16 flex flex-col gap-2'> 
          {Array.from({ length: 5 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))
            }</div>
           
          ) : isError ? (
          <div className='min-h-[50vh] flex flex-col items-center justify-center gap-4 px-5 text-center'>
            <h2 className='text-2xl font-semibold text-red-600'>
              Couldn't load posts
            </h2>
            <p className='text-neutral-600 max-w-md'>
              Please check your connection or try again later.
            </p>
            <button onClick={() => window.location.reload()} className='btn'>
              Refresh
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className='rounded-2xl bg-white p-10 text-center'>
            <h2 className='mb-3 text-xl font-medium text-neutral-700'>
              No posts available yet
            </h2>
          </div>
        ) : (
          <div>
            
            {/* HEADER */}
            <div className='w-full flex flex-row justify-between items-center sticky top-12  md:top-0 h-12 z-40 bg-neutral-100 px-2  mt-12 md:mt-0'>
              <h1 className="text-black font-bold text-2xl">Feeds</h1>

              <ul className="flex flex-row gap-4 items-center">
                
                <h3
                  onClick={() => setActiveFeed('feed')}
                  className={`px-2 py-1 font-semibold  cursor-pointer border-black ${
                    activeFeed === 'feed'
                      ? 'text-black border-b-2'
                      : 'text-neutral-400 hover:text-black hover:border-b-2'
                  }`}
                >
                  Stream
                </h3>

                <h3
                  onClick={() => setActiveFeed('dissent')}
                  className={`px-2 py-1 flex flex-row font-semibold  cursor-pointer border-orange-500 ${
                    activeFeed === 'dissent'
                      ? 'text-orange-500 border-b-2'
                      : 'text-neutral-400 hover:text-orange-500 hover:border-b-2 border-orange-500'
                  }`}
                >
                  <MdOutlineWhatshot size={24}/>
                  Counterpoints
                </h3>

                <h3 className="px-2 md:hidden flex py-1 font-semibold cursor-pointer text-neutral-400 hover:text-black hover:border-b-2 border-black">
                  Discussions
                </h3>

              </ul>
            </div>

            {/* POSTS */}
            <div className='space-y-2 m-2'>
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  ref={el => {
                    postRefs.current[post.id] = el
                  }}
                > 
                  {post ?
                  <PostCard post={post} />:
                  <PostCardSkeleton />
                  }
                  
                </div>
              ))}

              {/* Infinite Scroll */}
              <div ref={inViewRef} className='flex justify-center min-h-15'>
                {isFetchingNextPage ? (
                  <PostCardSkeleton/>
                ) : hasNextPage ? (
                  <span className='text-sm text-neutral-500'>
                    Loading more...
                  </span>
                ) : (
                  <span className='text-sm italic text-neutral-400'>
                    End of feed
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

    
    </main>
  )
}