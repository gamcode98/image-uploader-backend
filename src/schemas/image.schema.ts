import Joi from 'joi'

const _id = Joi.string().hex().length(24)
const fieldname = Joi.string()
const originalname = Joi.string()
const encoding = Joi.string()
const mimetype = Joi.string()
  .pattern(new RegExp('(^image)(/)[a-zA-Z0-9_]*'))
  .message('"mimetype" must be an image')
const destination = Joi.string()
const filename = Joi.string()
const size = Joi.number()
const path = Joi.string()

const uploadImageSchema = Joi.object({
  fieldname: fieldname.required(),
  originalname: originalname.required(),
  encoding: encoding.required(),
  mimetype: mimetype.required(),
  destination: destination.required(),
  filename: filename.required(),
  size: size.required(),
  path: path.required()
})

const getOneImageSchema = Joi.object({
  _id: _id.required()
})

const deleteOneImageSchema = Joi.object({
  _id: _id.required()
})

export { uploadImageSchema, getOneImageSchema, deleteOneImageSchema }
