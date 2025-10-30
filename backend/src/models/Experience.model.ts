import mongoose, { Document, Schema } from 'mongoose'

export interface IExperience extends Document {
  name: string
  location: string
  price: number
  description: string
  includes: string[]
  minAge: number
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

const ExperienceSchema: Schema = new Schema<IExperience>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    description: {
      type: String,
      required: true,
    },
    includes: {
      type: [String],
      default: [],
    },
    minAge: {
      type: Number,
      required: true,
      min: [0, 'Minimum age cannot be negative'],
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

ExperienceSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: Record<string, any>): void => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Experience = mongoose.model<IExperience>('Experience', ExperienceSchema)

export default Experience
