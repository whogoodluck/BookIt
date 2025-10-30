import { NextFunction, Request, Response } from 'express'
import promoService from '../services/promo.service'
import { HttpError } from '../utils/http-error'

async function validatePromoCode(req: Request, res: Response, next: NextFunction) {
  try {
    const { code, subtotal } = req.body

    if (!code || subtotal === undefined) {
      throw new HttpError(400, 'Promo code and subtotal are required')
    }

    if (typeof subtotal !== 'number' || subtotal < 0) {
      throw new HttpError(400, 'Subtotal must be a non-negative number')
    }

    const result = promoService.validatePromoCode(code, subtotal)

    res.status(200).json({
      success: result.valid,
      data: {
        valid: result.valid,
        discount: result.discount,
        code: result.code,
      },
      message: result.message,
    })
  } catch (err) {
    next(err)
  }
}

async function getAllPromoCodes(req: Request, res: Response, next: NextFunction) {
  try {
    const promoCodes = promoService.getAllPromoCodes()
    res.status(200).json({
      success: true,
      data: promoCodes,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  validatePromoCode,
  getAllPromoCodes,
}
