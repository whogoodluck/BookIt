interface PromoCode {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minAmount?: number
  maxDiscount?: number
}

interface PromoValidationResult {
  valid: boolean
  discount: number
  message: string
  code?: string
}

const promoCodes: PromoCode[] = [
  {
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    maxDiscount: 1000,
  },
  {
    code: 'FLAT50',
    type: 'fixed',
    value: 50,
    minAmount: 1000,
  },
]

function validatePromoCode(code: string, subtotal: number): PromoValidationResult {
  const promo = getPromoCode(code)

  if (!promo) {
    return {
      valid: false,
      discount: 0,
      message: 'Invalid promo code',
    }
  }

  if (promo.minAmount && subtotal < promo.minAmount) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum order amount of ₹${promo.minAmount} required for this promo code`,
    }
  }

  let discount = 0

  if (promo.type === 'percentage') {
    discount = (subtotal * promo.value) / 100
    if (promo.maxDiscount && discount > promo.maxDiscount) {
      discount = promo.maxDiscount
    }
  } else if (promo.type === 'fixed') {
    discount = promo.value
  }

  discount = Math.min(discount, subtotal)

  return {
    valid: true,
    discount: Math.round(discount * 100) / 100,
    message: `Promo code applied successfully! You saved ₹${discount}`,
    code: promo.code,
  }
}

function getAllPromoCodes() {
  return promoCodes
}

function getPromoCode(code: string) {
  return promoCodes.find(promo => promo.code === code)
}

export default {
  validatePromoCode,
  getAllPromoCodes,
  getPromoCode,
}
