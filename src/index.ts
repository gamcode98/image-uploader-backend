import express from 'express'
import cors from 'cors'
import { config } from './config'
import { connection } from './config/db'
import routerApi from './routes/index'
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from './middlewares/error.handler'

connection()

const app = express()

app.use(express.json())

app.use(cors())

app.use('/storage', express.static('storage'))

routerApi(app)

// app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(config.port, () =>
  console.log(`Listening: ${config.url}:${config.port} - 🚀`)
)
