import boom from '@hapi/boom'
import { NextFunction, Response } from 'express'
import { getImageNames } from '../helpers/images.helper'
import { RequestExt } from '../interfaces/request-ext'
import { deleteImageStored } from '../middlewares/file.handler'
import { deleteAllImages, getAllImages } from '../services/image.service'
import { deleteOneUser, updateOneUser } from '../services/user.service'
import { encrypt } from '../utils/bcrypt.handler'

const updateUserCtrl = async (
  { user, body }: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = user?.id

    const { password } = body

    const passwordHash = await encrypt(password)

    const response = await updateOneUser(userId, {
      ...body,
      password: passwordHash
    })

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

export { updateUserCtrl, deleteUserCtrl }
