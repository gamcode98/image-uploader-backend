import { Router } from 'express'
import {
  getImagesStored,
  uploadImageToStore
} from '../controllers/image.controller'
import multerMiddleware from '../middlewares/file.handler'
import checkJwt from '../middlewares/session.handler'

const router = Router()

router.post(
  '/upload',
  checkJwt,
  multerMiddleware.single('myFile'),
  uploadImageToStore
)

router.get('/', checkJwt, getImagesStored)

export default router
