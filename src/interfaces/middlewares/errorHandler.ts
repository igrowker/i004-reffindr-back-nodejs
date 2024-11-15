import { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  const status = err.response?.status || 500
  const message = err.response?.data?.message || 'Internal Server Error'

  res.status(status).json({ message })
}
