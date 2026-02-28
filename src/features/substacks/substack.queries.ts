import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { EditSubstackPayload, SubstackProfile } from './substack.types'
import { createSubstack, deleteSubstack, editSubstack, getAllSubstacksApi, getSubstackBySlugApi, getTopSubstacksApi } from '../../api/substack.api'


//create substack
export const useCreateSubstack = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) =>
      createSubstack(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['substacks'] })
    }
  })
}

//Edit substacks
export const useEditSubstack = (slug: string) =>
  useMutation({
    mutationFn: (payload: EditSubstackPayload) =>
      editSubstack(slug, payload)
  })


  //fetch substack details
export const useSubstackProfile = (slug: string) =>
  useQuery<SubstackProfile>({
    queryKey: ['substack', slug],
    queryFn: async () => (await getSubstackBySlugApi(slug)).data,
    enabled: !!slug,
    staleTime:600000,
    gcTime:1000*60*15
  })

  export const useAllSubstacks = () =>
  useQuery<SubstackProfile[]>({
    queryKey: ['substacks', 'all'],
    queryFn: async () => (await getAllSubstacksApi()).data,
    staleTime:600000,
    gcTime:1000*60*15
  })

export const useTopSubstacks = () =>
  useQuery<SubstackProfile[]>({
    queryKey: ['substacks', 'top'],
    queryFn: async () => (await getTopSubstacksApi()).data,
    staleTime:600000,
    gcTime:1000*60*15
  })

  //Destructive routes 
export const useDeleteSubstack = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (slug: string) => deleteSubstack(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['substacks'] })
    }
  })
}
