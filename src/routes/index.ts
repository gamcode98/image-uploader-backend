import { Router, Application } from 'express'
import authRouter from './auth.routes'
import imageRouter from './image.routes'
import userRouter from './user.routes'

const routerApi = (app: Application) => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/auth', authRouter)
  router.use('/users', userRouter)
  router.use('/images', imageRouter)
}

export default routerApi
