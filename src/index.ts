import express, { Express, Request, Response } from 'express'
import authRoutes from './interfaces/routes/authRoutes'
import propertyRoutes from './interfaces/routes/propertyRoutes'
import { errorHandler } from './interfaces/middlewares/errorHandler'
import 'dotenv/config'

const { PORT } = process.env
const app: Express = express()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/properties', propertyRoutes)

app.use(errorHandler)

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
