import { Image } from '../interfaces/image.interface'
import ImageModel from '../models/image.model'

const uploadOneImage = async ({ name, userId, path }: Image) => {
  const response = await ImageModel.create({ name, userId, path })
  return response
}

const getOneImage = async (
  id: string,
  userId: string
): Promise<Image | null> => {
  const reponse = await ImageModel.findOne({ _id: id, userId })
  return reponse
}

const getAllImages = async (userId: string): Promise<Image[]> => {
  const response: Image[] = await ImageModel.find({ userId })
  return response
}

const deleteOneImage = async (
  id: string,
  userId: string
): Promise<Image | null> => {
  const response = await ImageModel.findOneAndDelete({ _id: id, userId })
  return response
}

export { uploadOneImage, getOneImage, getAllImages, deleteOneImage }
