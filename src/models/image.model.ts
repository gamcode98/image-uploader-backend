import { Schema, model } from 'mongoose'
import { Image } from '../interfaces/image.interface'

const ImageSchema = new Schema<Image>(
  {
    name: { type: String },
    userId: { type: String },
    path: { type: String }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const ImageModel = model('image', ImageSchema)
export default ImageModel
