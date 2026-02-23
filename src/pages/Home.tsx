// pages/Home.tsx

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteHomeFeed } from '../features/posts/post.queries'; 
import PostCard from '../components/cards/PostCard';
import Loader from '../components/skeletons/Loader';
export default function Home() {
  const [mode, setMode] = useState<'feed' | 'random'>('random');
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '300px 0px',
  });

  const {
    posts,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    // Optional: you can add refetch if you want to force reload on tab change
  } = useInfiniteHomeFeed(mode);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Optional: reset scroll or refetch when mode changes (uncomment if desired)
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, [mode]);

  return (
    <main className="relative  bg-neutral-50/60  grid grid-cols-1 md:grid-cols-3">
      <div className="col-span-2 relative max-w-4xl  mb-16  ">
        {/* Header + Toggle Chips */}
        <div className=" mb-2 flex gap-5 flex-row  sticky top-0 z-10">
         
          <div className="w-full flex items-center  gap-2  bg-neutral-100 p-1.5 ">
            
            <button
              type="button"
              onClick={() => setMode('random')}
              className={`
                px-5 py-2 text-sm font-medium rounded-full transition-all duration-200
                ${
                  mode === 'random'
                    ? 'bg-white shadow-sm text-neutral-900'
                    : 'text-neutral-700 hover:text-neutral-900 hover:bg-white/60'
                }
              `}
            >
              Discover
            </button>
            <button
              type="button"
              onClick={() => setMode('feed')}
              className={`
                px-5 py-2 text-sm font-medium rounded-full transition-all duration-200
                ${
                  mode === 'feed'
                    ? 'bg-white shadow-sm text-neutral-900'
                    : 'text-neutral-700 hover:text-neutral-900 hover:bg-white/60'
                }
              `}
            >
              My Feed
            </button>

          </div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="w-full h-full"><Loader /></div>
          
        ) : isError ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-5 text-center">
            <h2 className="text-2xl font-semibold text-red-600">Couldn't load posts</h2>
            <p className="text-neutral-600 max-w-md">
              Please check your connection or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn"
            >
              Refresh
            </button>
          </div>
        ) : (
          <>
            {posts.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-neutral-200">
                <h2 className="mb-3 text-xl font-medium text-neutral-700">
                  No posts available yet
                </h2>
                <p className="text-neutral-500">
                  {mode === 'feed'
                    ? 'Follow creators or publish something to see content here.'
                    : 'New interesting posts are being discovered...'}
                </p>
              </div>
            ) : (
              <div className="space-y-2 md:px-2">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}

                {/* Infinite scroll trigger */}
                <div ref={ref} className="py-10 flex justify-center min-h-15">
                  {isFetchingNextPage ? (
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
                  ) : hasNextPage ? (
                    <span className="text-sm text-neutral-500">Loading more...</span>
                  ) : (
                    <span className="text-sm italic text-neutral-400">End of feed</span>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="hidden md:flex h-screen col-span-1 border-l-2 border-neutral-300 sticky right-0 top-0 p-2">secondary area</div>
    </main>
  );
}