import { Image } from '../interfaces/image.interface'
import ImageModel from '../models/image.model'

const uploadImage = async ({ name, userId, path }: Image) => {
  const response = await ImageModel.create({ name, userId, path })
  return response
}

const getImages = async (idUser: string) => {
  const response = await ImageModel.find({ idUser })
  return response
}

export { uploadImage, getImages }
