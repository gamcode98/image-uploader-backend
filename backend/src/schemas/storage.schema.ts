import Joi from 'joi'

const id = Joi.string()
const fileName = Joi.string()
const idUser = Joi.string()
const path = Joi.string()

const createStorageSchema = Joi.object({
  fileName: fileName.required,
  idUser: idUser.required,
  path: path.required
})

const getStorageSchema = Joi.object({
  id: id.required()
})

export { createStorageSchema, getStorageSchema }
