import { NextFunction, Request, Response } from 'express'
import {
  registerNewUser,
  findOneUserByEmail,
  updateOneUser,
  findOneUserById
} from '../services/user.service'
import { encrypt, verify } from '../utils/bcrypt.handler'
import { generateToken, verifyToken } from '../utils/jwt.handler'
import boom from '@hapi/boom'
import { config } from '../config'
import { sendEmail } from '../utils/email.handler'
import { UserDto } from '../dto/auth.dto'

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

    if (!user) throw boom.notFound('User not found')

    const isCorrect = await verify(password, user.password)

    if (!isCorrect) throw boom.unauthorized('Password incorrect')

    const token = generateToken({ id: user._id })

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

const recoveryPassword = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = body

    const user = await findOneUserByEmail(email)

    if (!user) throw boom.notFound('User not found')

    const payload = { sub: user._id }

    const token = generateToken(payload, '15min')

    const link = `${config.frontendUrl}/recovery?token=${token}`

    await updateOneUser(user._id, { recoveryToken: token })

    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: 'Email to recover password',
      html: `<b>Click <a href="${link}" target="_blank">here</a> to redirect the page</b>`
    }

    const response = await sendEmail(mail)

    res.status(200).send({
      statusCode: 200,
      message: response
    })
  } catch (error) {
    next(error)
  }
}

const changePassword = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, newPassword } = body

    const payload = verifyToken(token)

    const { sub } = payload

    const user = await findOneUserById(sub as UserDto['_id'])

    if (user?.recoveryToken === null) throw boom.unauthorized()

    const passwordHash = await encrypt(newPassword)

    await updateOneUser(sub as UserDto['_id'], {
      recoveryToken: null,
      password: passwordHash
    })

    res.status(200).send({
      statusCode: res.statusCode,
      message: 'Password changed successfully'
    })
  } catch (error) {
    next(error)
  }
}

export { register, login, recoveryPassword, changePassword }
