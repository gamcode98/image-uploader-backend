import { Router } from 'express'
import { getImages, uploadImage } from '../controllers/storage.controller'
import multerMiddleware from '../middlewares/file.handler'
import checkJwt from '../middlewares/session.handler'

const router = Router()

router.post('/upload', checkJwt, multerMiddleware.single('myFile'), uploadImage)

router.get('/images', checkJwt, getImages)

export default router
