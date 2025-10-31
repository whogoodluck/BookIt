import { NextFunction, Request, Response } from 'express'
import bookingService from '../services/booking.service'
import { HttpError } from '../utils/http-error'

async function createBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      slotId,
      experienceId,
      fullName,
      email,
      quantity,
      subtotal,
      taxes,
      totalAmount,
      promoCodeUsed,
    } = req.body

    if (
      !slotId ||
      !experienceId ||
      !fullName ||
      !email ||
      !quantity ||
      !subtotal ||
      !taxes ||
      !totalAmount
    ) {
      throw new HttpError(400, 'Missing required fields')
    }

    const booking = await bookingService.createBooking({
      slotId,
      experienceId,
      fullName,
      email,
      quantity,
      subtotal,
      taxes,
      totalAmount,
      promoCodeUsed,
    })

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking created successfully',
    })
  } catch (err) {
    next(err)
  }
}

async function getBookingById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const booking = await bookingService.getBookingById(id)

    if (!booking) {
      throw new HttpError(404, 'Booking not found')
    }

    res.status(200).json({
      success: true,
      data: booking,
    })
  } catch (err) {
    next(err)
  }
}

async function getBookingByRefId(req: Request, res: Response, next: NextFunction) {
  try {
    const { refId } = req.params
    const booking = await bookingService.getBookingByRefId(refId)

    if (!booking) {
      throw new HttpError(404, 'Booking not found')
    }

    res.status(200).json({
      success: true,
      data: booking,
    })
  } catch (err) {
    next(err)
  }
}

async function getAllBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const bookings = await bookingService.getAllBookings()
    res.status(200).json({
      success: true,
      data: bookings,
    })
  } catch (err) {
    next(err)
  }
}

async function getBookingsByEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.params
    const bookings = await bookingService.getBookingsByEmail(email)
    res.status(200).json({
      success: true,
      data: bookings,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createBooking,
  getBookingById,
  getBookingByRefId,
  getAllBookings,
  getBookingsByEmail,
}
