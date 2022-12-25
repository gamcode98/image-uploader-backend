import { NextFunction, Response } from 'express'
import { RequestExt } from '../interfaces/request-ext'
import { Image } from '../interfaces/image.interface'
import { uploadImage, getImages } from '../services/image.service'

const uploadImageToStore = async (
  { user, file }: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const image: Image = {
      name: `${file?.filename}`,
      userId: `${user?.id}`,
      path: `${file?.path}`
    }

    const response = await uploadImage(image)

    res.status(201).send({
      statusCode: 201,
      error: false,
      message: 'Image uploaded successfully',
      response
    })
  } catch (error) {
    next(error)
  }
}

const getImagesStored = async (
  { user }: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = user?.id
    const response = await getImages(userId)

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

export { uploadImageToStore, getImagesStored }
