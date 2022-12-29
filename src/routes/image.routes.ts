import { Router } from 'express'
import {
  uploadOneImageCtrl,
  getAllImagesCtrl,
  deleteOneImageCtrl,
  getOneImageCtrl
} from '../controllers/image.controller'
import { multerMiddleware } from '../middlewares/file.handler'
import checkJwt from '../middlewares/session.handler'
import validatorHandler from '../middlewares/validator.handler'
import {
  deleteOneImageSchema,
  getOneImageSchema,
  uploadImageSchema
} from '../schemas/image.schema'

const router = Router()

router.post(
  '/upload',
  checkJwt,
  multerMiddleware.single('file'),
  validatorHandler(uploadImageSchema, 'file'),
  uploadOneImageCtrl
)

router.get(
  '/:_id',
  checkJwt,
  validatorHandler(getOneImageSchema, 'params'),
  getOneImageCtrl
)

router.get('/', checkJwt, getAllImagesCtrl)

router.delete(
  '/:_id',
  checkJwt,
  validatorHandler(deleteOneImageSchema, 'params'),
  deleteOneImageCtrl
)

export default router
