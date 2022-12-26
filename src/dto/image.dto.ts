import { Image } from '../interfaces/image.interface'

export type UploadImageDto = Omit<Image, '_id' | 'createdAt' | 'updatedAt'>
