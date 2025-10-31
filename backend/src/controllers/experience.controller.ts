import { IExperience } from '@/models/Experience.model'
import { NextFunction, Request, Response } from 'express'
import { FilterQuery } from 'mongoose'
import experienceService from '../services/experience.service'
import slotService from '../services/slot.service'
import { HttpError } from '../utils/http-error'

async function getAllExperiences(req: Request, res: Response, next: NextFunction) {
  try {
    const { search } = req.query

    const filters: FilterQuery<IExperience> = {}

    if (search && typeof search === 'string') {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ]
    }

    const experiences = await experienceService.getAllExperiences(filters)
    res.status(200).json({
      success: true,
      data: experiences,
    })
  } catch (err) {
    next(err)
  }
}

async function getExperienceById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const experience = await experienceService.getExperienceById(id)

    if (!experience) {
      throw new HttpError(404, 'Experience not found')
    }

    const slots = await slotService.getSlotsByExperienceId(id)

    res.status(200).json({
      success: true,
      data: {
        experience,
        slots,
      },
    })
  } catch (err) {
    next(err)
  }
}

async function createExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const experience = await experienceService.createExperience(req.body)
    res.status(201).json({
      success: true,
      data: experience,
    })
  } catch (err) {
    next(err)
  }
}

async function updateExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const experience = await experienceService.updateExperience(id, req.body)

    if (!experience) {
      throw new HttpError(404, 'Experience not found')
    }

    res.status(200).json({
      success: true,
      data: experience,
    })
  } catch (err) {
    next(err)
  }
}

async function deleteExperience(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    await experienceService.deleteExperience(id)

    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully',
    })
  } catch (err) {
    next(err)
  }
}

export default {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
}
