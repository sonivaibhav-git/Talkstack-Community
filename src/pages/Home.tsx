import { useEffect, useRef, useState, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteHomeFeed } from '../features/posts/post.queries'
import PostCard from '../components/cards/PostCard'
import { profileMeCall } from '../call/profile'
import { substackPageCall } from '../call/substack'
import { MdOutlineWhatshot } from "react-icons/md";
import PostCardSkeleton from '../components/skeletons/PostCardSkeleton'
import { useTopSubstacks } from '../features/substacks/substack.queries'
import SubBlock from '../components/cards/SubBlock'
import { Link } from 'react-router-dom'


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
  
  const top = useTopSubstacks()
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
    <main className='relative mx-2 bg-neutral-100 grid grid-cols-1 md:grid-cols-4'>
      
      {/* LEFT SECTION */}
      <div className='col-span-3 relative  '>
         <div className='w-full flex flex-row justify-between items-center sticky top-6 md:top-0 h-12 z-40 bg-neutral-100 p-2 mt-6 md:mt-0 '>
              <h1 className="text-black font-bold text-xl">Feeds</h1>

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

              </ul>
            </div>
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
            
          

            {/* POSTS */}
            <div className='space-y-1 mt-2 md:mt-0 px-2 flex flex-col gap-2 justify-center'>
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
      <div className="col-span-1 p-2">
      <section className=' hidden mt-2 w-full md:flex sticky top-4 right-0 bg-white p-2 rounded-xl'>
        <div className=" w-full grid grid-cols-1 gap-2">
        <h1 className='text-md font-semibold text-black  tracking-wider mb-2 flex flex-row justify-between'>
          Suggested for you

          <Link to={'/explore'} className='text-purple-500' >See all</Link>
        </h1>
          {top.isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <SubBlockSkeleton key={i} />
              ))
            : top.data?.map(substack => (
                <SubBlock key={substack.id} substack={substack} />
              ))}
        </div>
      </section>
      </div>

    
    </main>

    
  )
}

const SubBlockSkeleton = () => (
  <div className="bg-white rounded-xl p-3 animate-pulse">
    <div className="w-full h-8 bg-neutral-300 rounded mb-2" />
    <div className="w-3/4 h-3 bg-neutral-300 rounded" />
  </div>
)