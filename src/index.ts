import express, { Express, Request, Response } from 'express'
import setupSwagger from './swagger/swagger'

import authRoutes from './routes/authRoutes'
import propertyRoutes from './routes/propertyRoutes'
import notificationRoutes from './routes/notificationRoutes'
import { errorHandler } from './middlewares/errorHandler'
import userRoutes from './routes/userRoutes'

import cors from 'cors'

import 'dotenv/config'

const { PORT } = process.env
const app: Express = express()

app.use(express.json())
setupSwagger(app)
app.use(cors())

app.use('/auth', authRoutes)
app.use('/properties', propertyRoutes)
app.use('/users', userRoutes)
app.use(notificationRoutes)

app.use(errorHandler)

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
