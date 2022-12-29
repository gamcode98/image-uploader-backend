import { Request } from 'express'
import multer from 'multer'
import fs from 'fs'
import boom from '@hapi/boom'

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, './storage')
  },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {    
    const ext = file.originalname.split('.').pop()
    const fileNameRandom = `image-${Date.now()}.${ext}`
    cb(null, fileNameRandom)    
  }
})

const multerMiddleware = multer({
    storage,
    fileFilter: (req, file, cb) => {    
    const regex = new RegExp('(^image)(/)[a-zA-Z0-9_]*')        
    if (!regex.test(file.mimetype)) return cb(boom.badRequest('File is not allowed'))    
    cb(null, true)
    }
  })

const deleteImageStored = async (...names: string[]) => {
  return Promise.all(
    names.map(
      name =>
        new Promise((resolve, reject) => {
          fs.unlink(`./storage/${name}`, err => {
            if (err)
              reject(
                boom.badData(`Something went wrong. Could not delete ${name}`)
              )
            resolve(`Successfully deleted image: ${name}`)
          })
        })
    )
  )
}

export { multerMiddleware, deleteImageStored }
