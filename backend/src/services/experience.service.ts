import { FilterQuery } from 'mongoose'
import Experience, { IExperience } from '../models/Experience.model'

async function getAllExperiences(filters?: FilterQuery<IExperience>) {
  const query = filters || {}
  const experiences = await Experience.find(query).sort({ createdAt: -1 })
  return experiences
}

async function getExperienceById(id: string) {
  const experience = await Experience.findById(id)
  return experience
}

async function createExperience(data: Partial<IExperience>) {
  const experience = new Experience(data)
  await experience.save()
  return experience
}

async function updateExperience(id: string, data: Partial<IExperience>) {
  const experience = await Experience.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
  return experience
}

async function deleteExperience(id: string) {
  const experience = await Experience.findByIdAndDelete(id)

  return experience
}

export default {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
}
