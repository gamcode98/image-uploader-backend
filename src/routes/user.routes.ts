import { Router } from 'express'
import {
  changePasswordCtrl,
  deleteUserCtrl,
  updateUserCtrl
} from '../controllers/user.controller'
import checkJwt from '../middlewares/session.handler'
import validatorHandler from '../middlewares/validator.handler'
import {
  changePasswordInSessionUserSchema,
  updateUserSchema
} from '../schemas/user.schema'

const router = Router()

router.patch(
  '/',
  checkJwt,
  validatorHandler(updateUserSchema, 'body'),
  updateUserCtrl
)

router.patch(
  '/',
  checkJwt,
  validatorHandler(changePasswordInSessionUserSchema, 'body'),
  changePasswordCtrl
)

router.delete('/', checkJwt, deleteUserCtrl)

export default router
