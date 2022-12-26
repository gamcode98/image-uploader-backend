import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

function validatorHandler(schema: any, property: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property as keyof Request]

    const { error } = schema.validate(data, { abortEarly: false })

    if (error) return next(boom.badRequest(error))

    if (property === 'file' && req[property as keyof Request] === undefined)
      return next(boom.badRequest('Image file not found'))

    next()
  }
}

export default validatorHandler
