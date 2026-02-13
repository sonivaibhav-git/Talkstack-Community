import { Link } from 'react-router-dom'
import type { SubstackPost } from '../../features/posts/post.types'
import VoteButtons from '../buttons/VoteButtons'
import { VscCommentDiscussion } from "react-icons/vsc";



type Props = {
  post: SubstackPost
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="group w-full h-1/2 rounded-xl bg-white overflow-hidden hover:shadow-md transition p-2"><Link
      to={`/posts/${post.id}`}
      
    >
      <div className="flex flex-col items-start gap-2 text-sm text-neutral-500  p-2">
        <div className="flex flex-row gap-2">
          
         <Link
                to={`/profile/${post.authorDto.username}`}
                className='hover:underline flex flex-row gap-2'
              >
                <img
            src={post.authorDto.avatar}
            className="w-5 h-5 rounded-full object-cover"
          />
                u/{post.authorDto.username}
              </Link>
          <span>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          </div>
          <div>   <h3 className="font-semibold text-lg line-clamp-2 text-neutral-700">
          {post.title}
        </h3>
        </div>
         
        </div>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-96 object-cover rounded-xl"
          loading="lazy"
        />
      )}

      
    </Link>
    <div className="p-4 flex flex-row gap-2">
        <VoteButtons voteCount={post.voteScore}/>
        <button><VscCommentDiscussion size={24}/></button>
      </div>
    </div>
    
  )
}

export default PostCard
