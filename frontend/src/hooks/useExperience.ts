import { useQuery } from '@tanstack/react-query'
import { getExperienceById, getExperiences } from '../services/experience'

export function useGetExperiences(text?: string) {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: () => getExperiences(text),
  })
}

export function useGetExperienceById(id: string) {
  return useQuery({
    queryKey: ['experiences', id],
    queryFn: () => getExperienceById(id),
  })
}
