import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usePost } from "../../features/posts/post.queries"
import { axiosPrivate } from "../../lib/axios/axiosPrivate"
import { LuArrowBigUp, LuArrowBigDown} from "react-icons/lu";


type Props = {
  postId: string
}

const VoteButtons = ({ postId }: Props) => {
  const queryClient = useQueryClient()
  const { data: post } = usePost(postId)

  const mutation = useMutation({
    mutationFn: async (type: 'up' | 'down') => {
      const endpoint =
        type === 'up'
          ? `/posts/${postId}/upvote`
          : `/posts/${postId}/downvote`

      return axiosPrivate.post(endpoint)
    },

    onMutate: async (type) => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] })

      const previousPost = queryClient.getQueryData<any>([
        'post',
        postId
      ])

      queryClient.setQueryData(['post', postId], (old: any) => {
        if (!old) return old

        const delta = type === 'up' ? 1 : -1

        return {
          ...old,
          voteCount: old.voteCount + delta
        }
      })

      return { previousPost }
    },

    onError: (_, __, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          ['post', postId],
          context.previousPost
        )
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', postId]
      })
    }
  })

  return (
    <div className="flex w-fit p-1 rounded-xl items-center gap-4 border-2 border-neutral-300">
      <button
        onClick={() => mutation.mutate('up')}
        className="px-3 py-1 rounded-xl transition bg-gray-200 text-gray-700 hover:bg-purple-100 active:bg-purple-600 active:text-white"
      >
        <LuArrowBigUp />

      </button>

      <span className="font-semibold text-lg text-neutral-700">
        {post?.voteScore ?? 0}
      </span>

      <button
        onClick={() => mutation.mutate('down')}
        className="px-3 py-1 rounded-xl transition bg-gray-200 text-gray-700 hover:bg-red-100 active:bg-red-600 active:text-white"
      >
        <LuArrowBigDown/>
      </button>
    </div>
  )
}

export default VoteButtons