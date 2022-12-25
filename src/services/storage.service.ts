import { Storage } from '../interfaces/storage.interface'
import StorageModel from '../models/storage.model'

const registerUpload = async ({ fileName, idUser, path }: Storage) => {
  const response = await StorageModel.create({ fileName, idUser, path })
  return response
}

const getStorage = async (idUser: string) => {
  const response = await StorageModel.find({ idUser })
  return response
}

export { registerUpload, getStorage }
