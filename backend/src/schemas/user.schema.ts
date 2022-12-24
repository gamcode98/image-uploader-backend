import Joi from 'joi'

const id = Joi.string()
const username = Joi.string()
const email = Joi.string().email()
const password = Joi.string()
  .min(8)
  .max(16)
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

const createUserSchema = Joi.object({
  username: username.required(),
  email: email.required(),
  password: password.required()
})

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
})

const updateUserSchema = Joi.object({
  email: email,
  password: password
})

const getUserSchema = Joi.object({
  id: id.required()
})

export { createUserSchema, loginUserSchema, updateUserSchema, getUserSchema }
