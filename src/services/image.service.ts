import { FindImageDto, UploadImageDto } from '../dto/image.dto'
import { Image } from '../interfaces/image.interface'
import ImageModel from '../models/image.model'

const uploadOneImage = async ({
  name,
  userId,
  path
}: UploadImageDto): Promise<Image> => {
  const response = await ImageModel.create({ name, userId, path })
  return response
}

const getOneImage = async ({
  _id,
  userId
}: FindImageDto): Promise<Image | null> => {
  const reponse = await ImageModel.findOne({ _id, userId })
  return reponse
}

const getAllImages = async (
  userId: FindImageDto['userId']
): Promise<Image[]> => {
  const response: Image[] = await ImageModel.find({ userId })
  return response
}

const deleteOneImage = async ({
  _id,
  userId
}: FindImageDto): Promise<Image | null> => {
  const response = await ImageModel.findOneAndDelete({ _id, userId })
  return response
}

const deleteAllImages = async (userId: Image['userId']) => {
  const response = await ImageModel.deleteMany({ userId })
  return response
}

export {
  uploadOneImage,
  getOneImage,
  getAllImages,
  deleteOneImage,
  deleteAllImages
}
