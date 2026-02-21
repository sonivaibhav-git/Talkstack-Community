import { useState } from 'react'
import { usePostComment, usePostComments } from '../../features/profile/comments.queries'
import CommentItem from '../cards/CommentItem'

const CommentsSection = ({ postId }: { postId: string }) => {
  const [text, setText] = useState('')
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostComments(postId)
  const postMutation = usePostComment(postId)

  return (
    <div className="relative w-full p-3 bg-neutral-200">
      <div className="mt-6 space-y-4 h-fit ">
        <h2> Comments</h2>
        {data?.pages.flatMap(p => p.data).map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <div className='sticky bottom-0 w-full mt-5'>
        <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className=" w-full border rounded p-3"
        placeholder="Add a comment…"
      />
      <button
        onClick={() => {
          postMutation.mutate(text)
          setText('')
        }}
        className="btn"
      >
        Post comment
      </button>
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 text-sm text-blue-600"
        >
          {isFetchingNextPage ? 'Loading…' : 'Load more comments'}
        </button>
      )}
    </div>
  )
}

export default CommentsSection
