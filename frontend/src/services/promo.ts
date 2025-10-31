import axios from 'axios'

const baseUrl = '/api/promo'

export async function validatePromoCode(data: { code: string; subtotal: number }) {
  const res = await axios.post(`${baseUrl}/validate`, data)

  return res.data
}
