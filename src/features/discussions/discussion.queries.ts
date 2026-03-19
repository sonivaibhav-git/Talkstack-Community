import { useMutation, useQuery } from '@tanstack/react-query'
import { createDiscussion, getDiscussionById } from '../../api/discussions.api'

export const useCreateDiscussion = () => {
  return useMutation({
    mutationFn: createDiscussion
  })
}

export const useDiscussion = (id: string) => {
  return useQuery({
    queryKey: ['discussion', id],
    queryFn: () => getDiscussionById(id),
    enabled: !!id
  })
}