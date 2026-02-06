import { Link } from 'react-router-dom'
import type { SubstackPost } from '../../features/posts/post.types'


type Props = {
  post: SubstackPost
}

const PostCard = ({ post }: Props) => {
  return (
    <Link
      to={`/posts/${post.id}`}
      className="group w-full h-1/2 rounded-xl bg-white overflow-hidden hover:shadow-md transition"
    >
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-96 object-cover"
          loading="lazy"
        />
      )}

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg line-clamp-2">
          {post.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <img
            src={post.authorDto.avatar}
            className="w-5 h-5 rounded-full object-cover"
          />
         <Link
                to={`/profile/${post.authorDto.username}`}
                className='hover:underline'
              >
                u/{post.authorDto.username}
              </Link>
          <span>•</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="text-sm text-neutral-600">
          Vote: <span className="font-medium">{post.voteScore}</span>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
