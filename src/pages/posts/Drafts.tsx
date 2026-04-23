import { useUserDrafts } from '../../features/posts/post.queries'
import PostCard from '../../components/cards/PostCard'
import PostCardSkeleton from '../../components/skeletons/PostCardSkeleton'

const Drafts = () => {
  const { data, isLoading, isError } = useUserDrafts()

  if (isLoading) return 
  {
   <PostCardSkeleton/>
  }
  
  if (isError) return <div>Failed to load drafts</div>

  if (!data || data.length === 0) {
    return <div className="text-center mt-10">No drafts available</div>
  }

  return (
    <div className="flex flex-col max-w-4xl my-10 md:mt-2 gap-4 mx-2">
       <h1 className="text-black font-bold text-2xl ">Drafts</h1>
      {data.map((draft: any) => (
          <div key={draft.id}
                > 
                  {draft ?
                  <PostCard post={draft} />:
                  <PostCardSkeleton />
                  }
                  
                </div>
      ))}
    </div>
  )
}

export default Drafts