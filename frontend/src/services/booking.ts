import axios from 'axios'

const baseUrl = '/api/bookings'

interface BookingData {
  slotId: string
  experienceId: string
  fullName: string
  email: string
  quantity: number
  subtotal: number
  taxes: number
  totalAmount: number
  promoCodeUsed?: string
}

export const bookExperience = async (data: BookingData) => {
  const res = await axios.post(`${baseUrl}`, data)

  return res.data
}
