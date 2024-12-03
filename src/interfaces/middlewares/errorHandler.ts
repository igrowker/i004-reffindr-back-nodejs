import { Response } from 'express';
import { BaseResponse } from '../../shared/utils/baseResponse';

export const errorHandler = (err: any, res: Response) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const details = Array.isArray(err.details) ? err.details : [message];

  res.status(statusCode).json(
    new BaseResponse({
      data: null,
      errors: details,
      hasErrors: true,
      statusCode,
    })
  );
};
