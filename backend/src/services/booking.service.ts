import { nanoid } from 'nanoid'
import Booking from '../models/Booking.model'
import slotService from './slot.service'

interface CreateBookingData {
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

async function createBooking(data: CreateBookingData) {
  try {
    const isAvailable = await slotService.checkAvailability(data.slotId, data.quantity)
    if (!isAvailable) {
      throw new Error('Slot is not available for the requested quantity')
    }

    const refId = `BK-${nanoid(10).toUpperCase()}`

    const booking = new Booking({
      refId,
      fullName: data.fullName,
      email: data.email,
      quantity: data.quantity,
      subtotal: data.subtotal,
      taxes: data.taxes,
      totalAmount: data.totalAmount,
      promoCodeUsed: data.promoCodeUsed,
      slot: data.slotId,
      experience: data.experienceId,
    })

    await slotService.bookSlot(data.slotId, data.quantity)

    await booking.save()

    await booking.populate('slot')
    await booking.populate('experience')

    return booking
  } catch (error) {
    throw new Error(`Error creating booking: ${error}`)
  }
}

async function getBookingById(id: string) {
  try {
    const booking = await Booking.findById(id).populate('slot').populate('experience')

    if (!booking) {
      throw new Error('Booking not found')
    }

    return booking
  } catch (error) {
    throw new Error(`Error fetching booking: ${error}`)
  }
}

async function getBookingByRefId(refId: string) {
  try {
    const booking = await Booking.findOne({ refId }).populate('slot').populate('experience')

    if (!booking) {
      throw new Error('Booking not found')
    }

    return booking
  } catch (error) {
    throw new Error(`Error fetching booking: ${error}`)
  }
}

async function getAllBookings() {
  try {
    const bookings = await Booking.find()
      .populate('slot')
      .populate('experience')
      .sort({ createdAt: -1 })

    return bookings
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error}`)
  }
}

async function getBookingsByEmail(email: string) {
  try {
    const bookings = await Booking.find({ email })
      .populate('slot')
      .populate('experience')
      .sort({ createdAt: -1 })

    return bookings
  } catch (error) {
    throw new Error(`Error fetching bookings by email: ${error}`)
  }
}

export default {
  createBooking,
  getBookingById,
  getBookingByRefId,
  getAllBookings,
  getBookingsByEmail,
}
