import mongoose from 'mongoose'
import Slot, { ISlot } from '../models/Slot.model'

async function getSlotsByExperienceId(experienceId: string) {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  const slots = await Slot.find({
    experience: experienceId,
    date: { $gte: currentDate },
  })
    .populate('experience')
    .sort({ date: 1, time: 1 })

  return slots
}

async function getSlotById(id: string) {
  const slot = await Slot.findById(id).populate('experience')
  if (!slot) {
    throw new Error('Slot not found')
  }
  return slot
}

async function createSlot(data: Partial<ISlot>) {
  const slot = new Slot(data)
  await slot.save()
  return slot
}

async function updateSlot(id: string, data: Partial<ISlot>) {
  const slot = await Slot.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
  return slot
}

async function checkAvailability(slotId: string, quantity: number) {
  const slot = await Slot.findById(slotId)
  if (!slot) {
    throw new Error('Slot not found')
  }

  const availableCapacity = slot.capacity - slot.booked
  return availableCapacity >= quantity && !slot.isSoldOut
}

async function bookSlot(slotId: string, quantity: number) {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const slot = await Slot.findById(slotId).session(session)
    if (!slot) {
      throw new Error('Slot not found')
    }

    const availableCapacity = slot.capacity - slot.booked
    if (availableCapacity < quantity) {
      throw new Error('Not enough capacity available')
    }

    if (slot.isSoldOut) {
      throw new Error('Slot is sold out')
    }

    slot.booked += quantity

    if (slot.booked >= slot.capacity) {
      slot.isSoldOut = true
    }

    await slot.save({ session })
    await session.commitTransaction()

    return slot
  } catch (error) {
    await session.abortTransaction()
    throw new Error(`Error booking slot: ${error}`)
  } finally {
    session.endSession()
  }
}

async function deleteSlot(id: string) {
  const slot = await Slot.findByIdAndDelete(id)
  if (!slot) {
    throw new Error('Slot not found')
  }
}

export default {
  getSlotsByExperienceId,
  getSlotById,
  createSlot,
  updateSlot,
  checkAvailability,
  bookSlot,
  deleteSlot,
}
