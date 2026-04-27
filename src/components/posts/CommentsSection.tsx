import { useState } from 'react'
import { usePostComment, usePostComments } from '../../features/profile/comments.queries'
import CommentItem from '../cards/CommentItem'
import { IoPaperPlaneSharp } from 'react-icons/io5'
import SecondaryBtn from '../buttons/SecondaryBtn'

const CommentsSection = ({ postId }: { postId: string }) => {
  const [text, setText] = useState('')
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostComments(postId)
  const postMutation = usePostComment(postId)

  return (
    <div className="relative w-full mt-2 border-t border-neutral-300">
      <div className="mt-6 space-y-4 h-fit ">
        <h2> Comments </h2>
        {data?.pages.flatMap(p => p.data).filter(comment => comment).map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <div className='sticky bottom-0 w-full mt-5 flex flex-col gap-2'>
        <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className=" w-full  rounded p-3 bg-white"
        placeholder="Add a comment…"
      />
      <SecondaryBtn
        onClick={() => {
          postMutation.mutate(text)
          setText('')
        }}
      >
        <IoPaperPlaneSharp />
        Post comment
      </SecondaryBtn>
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
