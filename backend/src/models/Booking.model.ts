import mongoose, { Document, Schema } from 'mongoose'

export interface IBooking extends Document {
  slotId: mongoose.Types.ObjectId
  experienceId: mongoose.Types.ObjectId
  refId: string
  fullName: string
  email: string
  quantity: number
  subtotal: number
  taxes: number
  totalAmount: number
  promoCodeUsed?: string
  createdAt: Date
  updatedAt: Date
}

const BookingSchema: Schema = new Schema(
  {
    refId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, 'Subtotal cannot be negative'],
    },
    taxes: {
      type: Number,
      required: true,
      min: [0, 'Taxes cannot be negative'],
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total amount cannot be negative'],
    },
    promoCodeUsed: {
      type: String,
      trim: true,
      uppercase: true,
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: 'Slot',
      required: true,
    },
    experience: {
      type: Schema.Types.ObjectId,
      ref: 'Experience',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

BookingSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: Record<string, any>): void => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Booking = mongoose.model<IBooking>('Booking', BookingSchema)

export default Booking
