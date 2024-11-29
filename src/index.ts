import cors from 'cors';
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import { errorHandler } from './interfaces/middlewares/errorHandler';
import authRoutes from './interfaces/routes/authRoutes';
import notificationRoutes from './interfaces/routes/notificationRoutes';
import propertyRoutes from './interfaces/routes/propertyRoutes';
import applicationRoutes from './interfaces/routes/applicationRoutes';
import userRoutes from './interfaces/routes/userRoutes';
import setupSwagger from './swagger/swagger';


const { PORT } = process.env
const app: Express = express()

app.use(express.json())
setupSwagger(app)
app.use(cors())

app.use('/auth', authRoutes)
app.use('/properties', propertyRoutes)
app.use('/application', applicationRoutes)
app.use('/users', userRoutes)
app.use(notificationRoutes)

app.use(errorHandler)

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})