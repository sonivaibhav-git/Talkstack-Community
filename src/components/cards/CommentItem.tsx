import { useState } from 'react'
import type { Comment } from '../../features/profile/comment.types'
import { useCommentReplies, usePostReply } from '../../features/profile/comments.queries'

const FALLBACK_AVATAR =
  'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'

const CommentItem = ({ comment }: { comment: Comment }) => {
  const [open, setOpen] = useState(false)
  const [reply, setReply] = useState('')

  if (comment.deleted) {
    return (
      <div className="border-2-l pl-4 mt-3 text-sm italic text-gray-400">
        Comment deleted
      </div>
    )
  }

  const author = comment.author
  const avatarSrc = author?.avatar ?? FALLBACK_AVATAR
  const username = author?.username ?? 'deleted'

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useCommentReplies(comment.id, open)

  const replyMutation = usePostReply(comment.id)

  return (
    <div className="border-2-l pl-4 mt-4 bg-white rounded-md p-2">
      <div className="flex gap-3">
        <img
          src={avatarSrc}
          alt="avatar"
          className="w-7 h-7 rounded-full object-cover"
          loading='lazy'
        />

        <div className="flex-1">
          <div className="text-sm font-medium">
            u/{username}
          </div>

          <div className="text-sm mt-1">
            {comment.content}
          </div>

          <button
            onClick={() => setOpen(v => !v)}
            className="text-xs mt-2 text-gray-500 hover:underline"
          >
            {open ? 'Hide replies' : 'View replies'}
          </button>

          {open && (
            <div className="mt-2">
              <textarea
                value={reply}
                onChange={e => setReply(e.target.value)}
                className="w-full border-2 rounded p-2 text-sm"
                placeholder="Write a reply…"
              />

              <button
                className="text-xs mt-1 text-blue-600"
                onClick={() => {
                  if (!reply.trim()) return
                  replyMutation.mutate(reply)
                  setReply('')
                }}
              >
                Reply
              </button>
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="mt-3 space-y-2">
          {data?.pages.flatMap(p => p.data).map(r => (
            <CommentItem key={r.id} comment={r} />
          ))}

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="text-xs text-blue-600"
            >
              {isFetchingNextPage ? 'Loading…' : 'Load more replies'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default CommentItem
