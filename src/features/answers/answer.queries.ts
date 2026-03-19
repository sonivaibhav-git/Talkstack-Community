import { useMutation, useQueryClient } from '@tanstack/react-query'

import{ postAnswer, upvoteAnswer, downvoteAnswer, deleteAnswer }  from '../../api/answers.api.ts'
// import from './answer.api'

export const usePostAnswer = (discussionId: string) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (content: string) =>
      postAnswer(discussionId, content),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['discussion', discussionId] })
    }
  })
}

export const useUpvote = (discussionId: string) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: upvoteAnswer,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['discussion', discussionId] })
    }
  })
}

export const useDownvote = (discussionId: string) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: downvoteAnswer,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['discussion', discussionId] })
    }
  })
}

export const useDeleteAnswer = (discussionId: string) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteAnswer,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['discussion', discussionId] })
    }
  })
}