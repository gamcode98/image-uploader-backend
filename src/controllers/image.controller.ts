import { NextFunction, Response, Request } from 'express'
import { RequestExt } from '../interfaces/request-ext'
import {
  uploadOneImage,
  getAllImages,
  deleteOneImage,
  getOneImage
} from '../services/image.service'
import { deleteImageStored } from '../middlewares/file.handler'
import { config } from '../config'
import boom from '@hapi/boom'
import { UploadImageDto } from '../dto/image.dto'

const uploadOneImageCtrl = async (
  { user, file }: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const imagesStored = await getAllImages(user?.id)

    if (imagesStored.length >= 10)
      throw boom.conflict(
        'Storage complete. You can not upload more than 10 images'
      )

    const image: UploadImageDto = {
      name: `${file?.filename}`,
      userId: `${user?.id}`,
      path: `${config.url}:${config.port}/${file?.path}`
    }

    const response = await uploadOneImage(image)

    res.status(201).send({
      statusCode: res.statusCode,
      error: false,
      message: 'Image uploaded successfully',
      response
    })
  } catch (error) {
    next(error)
  }
}

const getOneImageCtrl = async (
  { params, user }: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = params

    const userId = user?.id

    const response = await getOneImage({ _id, userId })

    if (!response) throw boom.notFound('No image found')

    res.status(200).send({
      statusCode: res.statusCode,
      error: false,
      message: 'Successfully retrieved image',
      response
    })
  } catch (error) {
    next(error)
  }
}

const getAllImagesCtrl = async (
  { user }: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = user?.id

    const response = await getAllImages(userId)

    res.status(200).send({
      statusCode: res.statusCode,
      error: false,
      message:
        response.length > 0
          ? 'Successfully retrieved images'
          : 'No images found',
      items: response.length,
      response
    })
  } catch (error) {
    next(error)
  }
}

const deleteOneImageCtrl = async (
  { user, params }: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = params

    const userId = user?.id

    const response = await getOneImage({ _id, userId })

    if (!response) throw boom.notFound('No image found')

    const { name } = response

    const message = await deleteImageStored(name)

    await deleteOneImage({ _id, userId })

    return res.status(200).send({
      statusCode: res.statusCode,
      error: false,
      message
    })
  } catch (error) {
    next(error)
  }
}

export {
  uploadOneImageCtrl,
  getOneImageCtrl,
  getAllImagesCtrl,
  deleteOneImageCtrl
}
