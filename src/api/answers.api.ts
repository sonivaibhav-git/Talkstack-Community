import { axiosPrivate } from '../lib/axios/axiosPrivate'

export const postAnswer = async (discussionId: string, content: string) => {
  const formData = new FormData()
  formData.append('content', content)

  const res = await axiosPrivate.post(`/answers/${discussionId}/answer`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}

export const upvoteAnswer = async (answerId: string) => {
  const res = await axiosPrivate.post(`/answers/${answerId}/upvote`)
  return res.data
}

export const downvoteAnswer = async (answerId: string) => {
  const res = await axiosPrivate.post(`/answers/${answerId}/downvote`)
  return res.data
}

export const deleteAnswer = async (answerId: string) => {
  const res = await axiosPrivate.delete(`/answers/${answerId}/delete`)
  return res.data
}