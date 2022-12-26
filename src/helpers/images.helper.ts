import { getAllImages } from '../services/image.service'

const getImageNames = async (userId: string) => {
  const images = await getAllImages(userId)

  const imageNames = images.map(image => image.name)

  return imageNames
}

export { getImageNames }
