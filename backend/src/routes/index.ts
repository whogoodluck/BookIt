import { Router } from 'express'
import bookingRouter from './booking.route'
import experienceRouter from './experience.route'
import promoRouter from './promo.route'

const router = Router()

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  })
})

router.use('/experiences', experienceRouter)
router.use('/bookings', bookingRouter)
router.use('/promo', promoRouter)

export default router
