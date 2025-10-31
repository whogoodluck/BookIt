import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { validatePromoCode } from '../services/promo'

export function useValidatePromoCode() {
  return useMutation({
    mutationFn: validatePromoCode,
    onSuccess: data => {
      if (!data.success) {
        toast.error(data.message)
      } else {
        toast.success(data.message)
      }
    },
  })
}
