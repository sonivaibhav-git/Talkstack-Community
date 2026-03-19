import { useState } from 'react'
import { usePostAnswer } from '../../features/answers/answer.queries'
import PrimaryBtn from '../buttons/PrimaryBtn'

interface Props {
  discussionId: string
}

const AnswerInput = ({ discussionId }: Props) => {
  const [content, setContent] = useState('')
  const { mutate, isPending } = usePostAnswer(discussionId)

  const handleSubmit = () => {
    if (!content.trim()) return

    mutate(content, {
      onSuccess: () => setContent('')
    })
  }

  return (
    <div className="space-y-3">

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your answer..."
        className="w-full p-3 bg-neutral-800 text-white rounded-xl"
      />

      <div className="flex justify-end">
        <PrimaryBtn onClick={handleSubmit} disabled={isPending}>
          {isPending ? 'Posting...' : 'Post Answer'}
        </PrimaryBtn>
      </div>

    </div>
  )
}

export default AnswerInput