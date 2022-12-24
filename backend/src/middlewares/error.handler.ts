import { Boom } from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err)
  next(err)
}

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function boomErrorHandler(
  err: Boom,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.isBoom) {
    const { output } = err

    return res.status(output.statusCode).json(output.payload)
  }
  return next(err)
}

export { logErrors, errorHandler, boomErrorHandler }
