import { useQuery } from '@tanstack/react-query'
import { getExperienceById, getExperiences } from '../services/experience'

export function useGetExperiences() {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: getExperiences,
  })
}

export function useGetExperienceById(id: string) {
  return useQuery({
    queryKey: ['experiences', id],
    queryFn: () => getExperienceById(id),
  })
}
