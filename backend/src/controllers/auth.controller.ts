import { NextFunction, Request, Response } from 'express'
import { registerNewUser } from '../services/auth.service'
import { findOneUserByEmail } from '../services/user.service'
import { encrypt, verify } from '../utils/bcrypt.handle'
import { generateToken } from '../utils/jwt.handle'
import boom from '@hapi/boom'

const register = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = body

    const user = await findOneUserByEmail(email)

    if (user) throw boom.forbidden('Already registered')

    const passwordHash = await encrypt(password)

    const response = await registerNewUser({ email, passwordHash, username })

    res.status(201).send({
      statusCode: 201,
      error: false,
      message: 'Created successfully',
      response
    })
  } catch (error) {
    next(error)
  }
}

const login = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = body

    const user = await findOneUserByEmail(email)

    if (!user) throw boom.notFound('Not found')

    const isCorrect = await verify(password, user.password)

    if (!isCorrect) throw boom.unauthorized('Password incorrect')

    const token = generateToken(user._id)

    res.status(200).send({
      statusCode: 200,
      error: false,
      message: 'User found',
      response: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        },
        token
      }
    })
  } catch (error) {
    next(error)
  }
}

export { register, login }
