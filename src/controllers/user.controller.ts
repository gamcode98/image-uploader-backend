import boom from '@hapi/boom'
import { NextFunction, Response } from 'express'
import { getImageNames } from '../helpers/images.helper'
import { encrypt, verify } from '../utils/bcrypt.handler'
import { RequestExt } from '../interfaces/request-ext'
import { deleteImageStored } from '../middlewares/file.handler'
import { deleteAllImages } from '../services/image.service'
import {
  deleteOneUser,
  findOneUserById,
  updateOneUser
} from '../services/user.service'

const updateUserCtrl = async (
  { user, body }: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = user?.id

    const { username, email } = body

    const response = await updateOneUser(userId, { username, email })

    if (response === null) throw boom.clientTimeout('Something went wrong')

    res.status(200).send({
      statusCode: res.statusCode,
      error: false,
      message: 'User successfully updated',
      response
    })
  } catch (error) {
    next(error)
  }
}

const changePasswordCtrl = async (
  { user, body }: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = user?.id

    const { oldPassword, newPassword } = body

    const userFound = await findOneUserById(userId)

    if (userFound === null) throw boom.badRequest('User not found')

    const isCorrect = await verify(oldPassword, userFound?.password)

    if (!isCorrect) throw boom.unauthorized('Password incorrect')

    const passwordHash = await encrypt(newPassword)

    const response = await updateOneUser(userId, { password: passwordHash })

    if (response === null) throw boom.clientTimeout('Something went wrong')

    res.status(200).send({
      statusCode: res.statusCode,
      error: false,
      message: 'Password successfully updated',
      response
    })
  } catch (error) {
    next(error)
  }
}

const deleteUserCtrl = async (
  { user }: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = user?.id

    const images = await getImageNames(userId)

    await deleteImageStored(...images)

    await deleteAllImages(userId)

    await deleteOneUser(userId)

    res.status(200).send({
      statusCode: res.statusCode,
      error: false,
      message: 'User successfully deleted'
    })
  } catch (error) {
    next(error)
  }
}

export { updateUserCtrl, changePasswordCtrl, deleteUserCtrl }
