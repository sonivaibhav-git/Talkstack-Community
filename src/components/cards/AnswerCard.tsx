import { useDeleteAnswer, useDownvote, useUpvote } from "../../features/answers/answer.queries"
import type { Answer } from "../../features/discussions/discussion.types"

import { LuArrowBigUp, LuArrowBigDown} from "react-icons/lu";
import DestructiveBtn from "../buttons/DestructiveBtn"


interface Props {
  answer: Answer
  discussionId: string
}

const AnswerCard = ({ answer, discussionId }: Props) => {
  const { mutate: upvote } = useUpvote(discussionId)
  const { mutate: downvote } = useDownvote(discussionId)
  const { mutate: deleteAns, isPending } = useDeleteAnswer(discussionId)

  return (
    <div className="bg-neutral-200 p-4 rounded-xl space-y-3">

      <p className="text-neutral-700">{answer.content}</p>

      <div className="flex items-center gap-4 text-sm text-neutral-400">
        <div className="border-2 border-neutral-700 flex flex-row p-1 gap-3 rounded-xl">
          <button
          onClick={() => upvote(answer.id)}
          className="hover:text-white flex flex-row gap-1 hover:bg-purple-300 p-2 rounded-lg"
        >
          <LuArrowBigUp size={20 }/><span className="font-semibold text-neutral-800">{answer.upvotes}</span>
        </button>

        <button
          onClick={() => downvote(answer.id)}
          className="hover:text-white flex flex-row gap-1 hover:bg-red-300 p-2 rounded-lg"
        >
          <LuArrowBigDown size={20 }/><span className="font-semibold text-neutral-800">{answer.downvotes}</span>
        </button></div>
        

        <button
          onClick={() => deleteAns(answer.id)}
          disabled={isPending}
          className="text-red-500  bg-red-200 rounded-xl px-3 py-1"
        >
          Delete
        </button>

      </div>

    </div>
  )
}

export default AnswerCard