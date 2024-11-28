import { Request, Response, NextFunction } from 'express'

export const validateOwnerEmail = (req: Request, res: Response, next: NextFunction): void | Response => {
  const { ownerEmail } = req.query

  if (!ownerEmail || typeof ownerEmail !== 'string') {
    return res.status(400).json({
      errors: ['El correo del propietario (ownerEmail) es obligatorio y debe ser un string.'],
      hasErrors: true,
      statusCode: res.statusCode,
    })
  }

  next()
}
