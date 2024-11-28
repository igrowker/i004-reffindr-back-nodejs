import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { BaseResponse } from '../../shared/utils/baseResponse'

export const errorValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorsValidation = errors.array().map((error) => error.msg)

    return res.status(400).json(
      new BaseResponse({
        errors: errorsValidation,
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
  return next()
}
