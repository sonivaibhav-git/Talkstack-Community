import type { EditSubstackPayload } from "../features/substacks/substack.types"
import { axiosPrivate } from "../lib/axios/axiosPrivate"

export const getSubstackBySlugApi = (slug: string) =>
  axiosPrivate.get(`/substacks/${slug}`)


export const getAllSubstacksApi = () =>
  axiosPrivate.get('/substacks')

export const getTopSubstacksApi = () =>
  axiosPrivate.get('/substacks/top')


export const editSubstack = (slug: string, payload: EditSubstackPayload) =>
  axiosPrivate.put(`/substacks/edit/${slug}`, payload)


export const followSubstackApi = (slug: string) =>
  axiosPrivate.post(`/substacks/${slug}/follow`)

export const unfollowSubstackApi = (slug: string) =>
  axiosPrivate.delete(`/substacks/${slug}/unfollow`)