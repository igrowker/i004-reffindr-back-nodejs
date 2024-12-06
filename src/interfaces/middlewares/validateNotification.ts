import { NextFunction, Request, Response } from 'express'

export const validateAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ message: 'No authorization token provided' })
  }

  req.headers['validated-token'] = token 
    next()
    return;
}
