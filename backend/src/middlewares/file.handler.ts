import { Request } from 'express'
import multer from 'multer'

const PATH_STORAGE = `${process.cwd()}/storage`

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, PATH_STORAGE)
  },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    const ext = file.originalname.split('.').pop()
    const fileNameRandom = `image-${Date.now()}.${ext}`
    cb(null, fileNameRandom)
  }
})

const multerMiddleware = multer({ storage })

export default multerMiddleware
