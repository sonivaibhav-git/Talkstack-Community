import React from 'react'
import type { PostItem } from '../../features/profile/profile.types'



type Props = {
  data: PostItem[]
}
function Post({ data }: Props) {
  return (
    <div className="feed-list">
      {data.map(item => (
        <div key={item.id} className="feed-card">
          <img src={item.imageUrl} alt={item.title} className="feed-image" />

          <div className="feed-content">
            <h3>{item.title}</h3>
            <span className="substack">@{item.substackSlug}</span>

            <div className="author">
              <img src={item.authorDto.avatar} alt={item.authorDto.username} />
              <span>{item.authorDto.username}</span>
            </div>

            <div className="metrics">
              <span>Score: {item.voteScore}</span>
              <span>↑ {item.upvotes}</span>
              <span>↓ {item.downvotes}</span>
            </div>

            <time>{new Date(item.createdAt).toLocaleString()}</time>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Post
