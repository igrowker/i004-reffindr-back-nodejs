import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { BaseResponse } from '../shared/utils/baseResponse'

const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorsValidation = errors.array().map((error) => error.msg)
    res.status(400).json(
      new BaseResponse({
        errors: errorsValidation,
        hasErrors: true,
        statusCode: 400,
      })
    )
    return
  }
  next()
}

export default handleValidationErrors