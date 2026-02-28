import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteHomeFeed } from '../features/posts/post.queries'
import PostCard from '../components/cards/PostCard'
import Loader from '../components/skeletons/Loader'
import { profileMeCall } from '../call/profile'
import { substackPageCall } from '../call/substack'

export default function Home () {
  const [mode, setMode] = useState<'feed' | 'random'>('random')

  const postRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const hasRestoredScroll = useRef(false)

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
  } = useInfiniteHomeFeed(mode)

  // Infinite scroll
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  // 🔥 Scroll restoration
  useEffect(() => {
    if (hasRestoredScroll.current) return

    const lastViewedPostId = sessionStorage.getItem('lastViewedPostId')
    if (!lastViewedPostId) return

    const el = postRefs.current[lastViewedPostId]

    if (el) {
      hasRestoredScroll.current = true

      requestAnimationFrame(() => {
        el.scrollIntoView({
          behavior: 'auto',
          block: 'center'
        })
      })

      sessionStorage.removeItem('lastViewedPostId')
    }
  }, [posts])

  profileMeCall()
  substackPageCall()
  return (
    <main className='relative bg-neutral-50/60 grid grid-cols-1 md:grid-cols-3'>
      <div className='col-span-2 relative max-w-4xl mb-16'>
        {/* Header */}
        <div className='mb-2 flex gap-5 flex-row sticky top-0 z-10 bg-purple-200  rounded-xl '>
          <div className='w-full flex items-center gap-2  p-1.5'>
            <button
              type='button'
              onClick={() => setMode('random')}
              className={`px-5 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                mode === 'random'
                  ? 'bg-white shadow-sm text-neutral-900'
                  : 'text-neutral-700 hover:text-neutral-900 hover:bg-white/60'
              }`}
            >
              Discover
            </button>

            <button
              type='button'
              onClick={() => setMode('feed')}
              className={`px-5 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                mode === 'feed'
                  ? 'bg-white shadow-sm text-neutral-900'
                  : 'text-neutral-700 hover:text-neutral-900 hover:bg-white/60'
              }`}
            >
              My Feed
            </button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className='w-full h-full'>
            <Loader />
          </div>
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
          <div className='rounded-2xl bg-white p-10 text-center '>
            <h2 className='mb-3 text-xl font-medium text-neutral-700'>
              No posts available yet
            </h2>
          </div>
        ) : (
          <div className='space-y-2 md:px-2'>
            {posts.map(post => (
              <div
                key={post.id}
                ref={el => {
                  postRefs.current[post.id] = el
                }}
              >
                <PostCard post={post} />
              </div>
            ))}

            {/* Infinite Scroll Trigger */}
            <div ref={inViewRef} className='py-10 flex justify-center min-h-15'>
              {isFetchingNextPage ? (
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent' />
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
        )}
      </div>
      <div className='hidden md:flex col-span-1 sticky top-0 right-0 z-0 p-2
    h-[calc(100vh-4rem)]
    bg-white  rounded-b-2xl'>Hee</div>
    </main>
  )
}
