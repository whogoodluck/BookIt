import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { bookExperience } from '../services/booking'

export function useBookExperience() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: bookExperience,
    onSuccess: data => {
      navigate('/confirmation', { state: data })
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || error.message)
    },
  })
}
