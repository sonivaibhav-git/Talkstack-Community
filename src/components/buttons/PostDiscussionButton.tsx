import { useState } from 'react'
import PrimaryBtn from '../buttons/PrimaryBtn'
import PostDiscussionModal from '../cards/PostDiscussionModal'

interface PostDiscussionButtonProps {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
}

const PostDiscussionButton = ({
  children = 'Post Discussion',
  disabled = false
}: PostDiscussionButtonProps = {}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        disabled={disabled}
        className="rounded-full p-3 bg-neutral-900 hover:bg-neutral-200 text-white hover:text-neutral-900"
      >
        +
        {children}
      </button>
      <PostDiscussionModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default PostDiscussionButton