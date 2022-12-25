import { NextFunction, Request, Response } from 'express'
import { registerNewUser, findOneUserByEmail } from '../services/user.service'
import { encrypt, verify } from '../utils/bcrypt.handler'
import { generateToken } from '../utils/jwt.handler'
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
      message: 'Registration successful',
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
      message: 'Login successful',
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
