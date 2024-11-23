import express, { Express, Request, Response } from 'express'
import authRoutes from './interfaces/routes/authRoutes'
import propertyRoutes from './interfaces/routes/propertyRoutes'
import { errorHandler } from './interfaces/middlewares/errorHandler'
import userRoutes from './interfaces/routes/userRoutes'
import cors from 'cors'
import 'dotenv/config'

const { PORT } = process.env
const app: Express = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes)
app.use('/properties', propertyRoutes)
app.use('/users', userRoutes)

app.use(errorHandler)

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
