import type { Experience } from './experience'

export interface Slot {
  id: string
  experience: Experience
  date: string
  time: string
  capacity: number
  booked: number
  isSoldOut: boolean
  createdAt: string
  updatedAt: string
}
