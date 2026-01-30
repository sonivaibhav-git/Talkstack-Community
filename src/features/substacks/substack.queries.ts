import { useQuery } from '@tanstack/react-query'
import type { SubstackProfile } from './substack.types'
import { getAllSubstacksApi, getSubstackBySlugApi, getTopSubstacksApi } from '../../api/substack.api'


export const useSubstackProfile = (slug: string) =>
  useQuery<SubstackProfile>({
    queryKey: ['substack', slug],
    queryFn: async () => (await getSubstackBySlugApi(slug)).data,
    enabled: !!slug
  })


  export const useAllSubstacks = () =>
  useQuery<SubstackProfile[]>({
    queryKey: ['substacks', 'all'],
    queryFn: async () => (await getAllSubstacksApi()).data
  })

export const useTopSubstacks = () =>
  useQuery<SubstackProfile[]>({
    queryKey: ['substacks', 'top'],
    queryFn: async () => (await getTopSubstacksApi()).data
  })