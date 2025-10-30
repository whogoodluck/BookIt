import mongoose, { Document, Schema } from 'mongoose'

export interface ISlot extends Document {
  experience: mongoose.Types.ObjectId
  date: Date
  time: string
  capacity: number
  booked: number
  isSoldOut: boolean
  createdAt: Date
  updatedAt: Date
}

const SlotSchema: Schema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      default: 5,
      min: [1, 'Capacity must be at least 1'],
    },
    booked: {
      type: Number,
      default: 0,
      min: [0, 'Booked count cannot be negative'],
    },
    isSoldOut: {
      type: Boolean,
      default: false,
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

SlotSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: Record<string, any>): void => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Slot = mongoose.model<ISlot>('Slot', SlotSchema)

export default Slot
