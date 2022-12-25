import { NextFunction, Response } from 'express'
import { RequestExt } from '../interfaces/request-ext'
import { Storage } from '../interfaces/storage.interface'
import { getStorage, registerUpload } from '../services/storage.service'

const uploadImage = async (
  { user, file }: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataToRegister: Storage = {
      fileName: `${file?.filename}`,
      idUser: `${user?.id}`,
      path: `${file?.path}`
    }

    const response = await registerUpload(dataToRegister)

    res.status(201).send({
      statusCode: 201,
      error: false,
      message: 'Storage uploaded successfully',
      response
    })
  } catch (error) {
    next(error)
  }
}

const getImages = async (
  { user }: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = user?.id
    const response = await getStorage(userId)

    res.status(200).send({
      statusCode: res.statusCode,
      error: false,
      message: 'Successfully retrieved images',
      response
    })
  } catch (error) {
    next(error)
  }
}

export { uploadImage, getImages }
