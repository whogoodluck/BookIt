import { Router } from 'express'
import promoController from '../controllers/promo.controller'

const promoRouter = Router()

promoRouter.post('/validate', promoController.validatePromoCode)
promoRouter.get('/', promoController.getAllPromoCodes)

export default promoRouter
