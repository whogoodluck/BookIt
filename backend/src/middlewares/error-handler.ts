import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger'

interface ErrorType extends Error {
  statusCode?: number
  code?: string
  details?: { message: string }[]
}

const getErrorResponse = (err: ErrorType) => {
  const types: Record<string, { statusCode: number; message: string }> = {
    JsonWebTokenError: {
      statusCode: 403,
      message: 'invalid token',
    },
    TokenExpiredError: {
      statusCode: 403,
      message: 'token expired',
    },
    HttpError: {
      statusCode: err.statusCode || 400,
      message: err.message,
    },
    default: {
      statusCode: err.statusCode || 500,
      message: 'internal server error',
    },
  }

  return types[err.name] || types['default']
}

const errorHandler = (err: ErrorType, _req: Request, res: Response, _next: NextFunction) => {
  // Logging
  logger.error('Error ->', err.message)

  const { statusCode, message } = getErrorResponse(err as ErrorType)

  return res.status(statusCode).json({ status: 'error', message })
}

export default errorHandler
