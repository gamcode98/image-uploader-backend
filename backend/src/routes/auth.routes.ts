import { Router } from 'express'
import { login, register } from '../controllers/auth.controller'
import validatorHandler from '../middlewares/validator.handler'
import { createUserSchema, loginUserSchema } from '../schemas/user.schema'

const router = Router()

router.post('/register', validatorHandler(createUserSchema, 'body'), register)
router.post('/login', validatorHandler(loginUserSchema, 'body'), login)

export default router
