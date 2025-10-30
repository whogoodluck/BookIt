import { Router } from 'express'
import experienceController from '../controllers/experience.controller'

const experienceRouter = Router()

experienceRouter.get('/', experienceController.getAllExperiences)
experienceRouter.get('/:id', experienceController.getExperienceById)
experienceRouter.post('/', experienceController.createExperience)
experienceRouter.put('/:id', experienceController.updateExperience)
experienceRouter.delete('/:id', experienceController.deleteExperience)

export default experienceRouter
