import { NextFunction, Response } from 'express'
import { RequestExt } from '../interfaces/request-ext'
import { Storage } from '../interfaces/storage.interface'
import { registerUpload } from '../services/storage.service'

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

export { uploadImage }
