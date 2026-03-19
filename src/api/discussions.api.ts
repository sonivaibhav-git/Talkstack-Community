import type { 
  Discussion,
  CreateDiscussionPayload 
} from '../features/discussions/discussion.types'
import { axiosPrivate } from '../lib/axios/axiosPrivate'

export const createDiscussion = async (
  payload: CreateDiscussionPayload
): Promise<Discussion> => {
  const formData = new FormData()

  formData.append('title', payload.title)
  formData.append('description', payload.description)
  formData.append('substackSlug', payload.substackSlug)

  const res = await axiosPrivate.post('/questions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}

export const getDiscussionById = async (id: string): Promise<Discussion> => {
  const res = await axiosPrivate.get(`/questions/${id}`)
  return res.data
}
