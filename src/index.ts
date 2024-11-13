import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import authRoutes from './interfaces/routes/authRoutes';
import { errorHandler } from './shared/middleware/errorHandler';

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.use('/auth', authRoutes);
app.use(errorHandler);


app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
