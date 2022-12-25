import { Router, Application } from 'express'
import authRouter from './auth.routes'
import storageRouter from './storage.routes'

const routerApi = (app: Application) => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/auth', authRouter)
  router.use('/storage', storageRouter)
}

export default routerApi
