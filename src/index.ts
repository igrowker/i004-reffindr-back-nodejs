import express, { Express, Request, Response } from 'express'
import authRoutes from './interfaces/routes/authRoutes'
import { errorHandler } from './shared/middleware/errorHandler'
import 'dotenv/config'

const { PORT } = process.env
const app: Express = express()

app.use(express.json())

app.use('/auth', authRoutes)

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
