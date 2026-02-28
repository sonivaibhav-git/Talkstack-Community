import type { EditSubstackPayload } from "../features/substacks/substack.types"
import { axiosPrivate } from "../lib/axios/axiosPrivate"


//create Substack
export const createSubstack = async (formData: FormData) => {
  const res = await axiosPrivate.post('/api/substacks', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data.message
}

// Delete Substack
export const deleteSubstack = async (slug: string) => {
  const res = await axiosPrivate.delete(`/substacks/${slug}`)
  return res.data
}

//edit substack
export const editSubstack = (slug: string, payload: EditSubstackPayload) =>
  axiosPrivate.put(`/substacks/edit/${slug}`, payload)

//Fetch Substack
export const getSubstackBySlugApi = (slug: string) =>
  axiosPrivate.get(`/substacks/${slug}`)


export const getAllSubstacksApi = () =>
  axiosPrivate.get('/substacks')

export const getTopSubstacksApi = () =>
  axiosPrivate.get('/substacks/top')


//Follow Unfollow substack
export const followSubstackApi = (slug: string) =>
  axiosPrivate.post(`/substacks/${slug}/follow`)

export const unfollowSubstackApi = (slug: string) =>
  axiosPrivate.delete(`/substacks/${slug}/unfollow`)

