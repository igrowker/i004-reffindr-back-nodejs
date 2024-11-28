import { Request, Response, NextFunction } from 'express'

export const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    statusCode,
    hasErrors: true,
    errors: [message],
  })
}
