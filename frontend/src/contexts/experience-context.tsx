import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import { toast } from 'sonner'
import { getExperiences } from '../services/experience'
import type { Experience } from '../types/experience'

interface ExperienceContextType {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  experiences: Experience[]
  setExperiences: Dispatch<SetStateAction<Experience[]>>
}

const ExperienceContext = createContext<ExperienceContextType>({
  isLoading: false,
  setIsLoading: () => {},
  experiences: [],
  setExperiences: () => {},
})

interface ExperienceProviderProps {
  children: ReactNode
}

export function ExperienceProvider({ children }: ExperienceProviderProps) {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchExperiences = async () => {
    try {
      setIsLoading(true)
      const res = await getExperiences()

      setExperiences(res.data)
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  return (
    <ExperienceContext.Provider value={{ isLoading, setIsLoading, experiences, setExperiences }}>
      {children}
    </ExperienceContext.Provider>
  )
}

export const useExperience = () => {
  return useContext(ExperienceContext)
}
