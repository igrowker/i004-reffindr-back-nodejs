import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BaseResponse } from '../shared/utils/baseResponse';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void | Response => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsValidation = errors.array().map((error) => error.msg);
    return res.status(400).json(
      new BaseResponse({
        errors: errorsValidation,
        hasErrors: true,
        statusCode: res.statusCode,
      })
    );
  }
  next()
}
