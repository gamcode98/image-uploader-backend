import { Router } from 'express'
import { deleteUserCtrl, updateUserCtrl } from '../controllers/user.controller'
import checkJwt from '../middlewares/session.handler'
import validatorHandler from '../middlewares/validator.handler'
import { updateUserSchema } from '../schemas/user.schema'

const router = Router()

router.patch(
  '/',
  checkJwt,
  validatorHandler(updateUserSchema, 'body'),
  updateUserCtrl
)

router.delete('/', checkJwt, deleteUserCtrl)

export default router
