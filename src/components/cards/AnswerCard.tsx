import { useDeleteAnswer, useDownvote, useUpvote } from "../../features/answers/answer.queries"
import type { Answer } from "../../features/discussions/discussion.types"

import { LuArrowBigUp, LuArrowBigDown} from "react-icons/lu";


interface Props {
  answer: Answer
  discussionId: string
  author:string
  me:string
}

const AnswerCard = ({ answer, discussionId,author , me }: Props) => {
  const { mutate: upvote } = useUpvote(discussionId)
  const { mutate: downvote } = useDownvote(discussionId)
  const { mutate: deleteAns, isPending } = useDeleteAnswer(discussionId)

  return (
    <div className="bg-neutral-100 border border-neutral-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition">
      
      <h1 className="text-neutral-800  text-lg font-semibold">{answer.author.username}</h1>
      <p className="text-neutral-800 mb-3">{answer.content}</p>

      <div className="flex items-center justify-between">

        {/* Votes */}
        <div className="flex items-center gap-2 bg-white border rounded-xl p-1">
          <button
            onClick={() => upvote(answer.id)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-purple-500"
          >
            <LuArrowBigUp size={18} />
            <span>{answer.upvotes}</span>
          </button>

          <button
            onClick={() => downvote(answer.id)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-400"
          >
            <LuArrowBigDown size={18} />
            <span>{answer.downvotes}</span>
          </button>
        </div>

        {/* Delete */}

        {answer.author.username == author || answer.author.username == me?<button
          onClick={() => deleteAns(answer.id)}
          disabled={isPending}
          className="text-xs text-red-500 hover:bg-red-100 px-3 py-1 rounded-lg"
        >
          Delete
        </button>:" "}
        
      </div>
    </div>
  )
}

export default AnswerCard