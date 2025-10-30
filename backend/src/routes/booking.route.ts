import { Router } from 'express'
import bookingController from '../controllers/booking.controller'

const bookingRouter = Router()

bookingRouter.post('/', bookingController.createBooking)
bookingRouter.get('/', bookingController.getAllBookings)
bookingRouter.get('/:id', bookingController.getBookingById)
bookingRouter.get('/ref/:refId', bookingController.getBookingByRefId)
bookingRouter.get('/email/:email', bookingController.getBookingsByEmail)

export default bookingRouter
