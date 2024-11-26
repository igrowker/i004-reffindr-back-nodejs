import { NextFunction, Request, Response } from 'express'

export const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({
      errors: ['Token de autorización no proporcionado.'],
      hasErrors: true,
      statusCode: res.statusCode,
    })
  }
  req.headers['Authorization'] = `Bearer ${token}`
  return next()
}
