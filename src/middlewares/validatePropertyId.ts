import { body } from 'express-validator'

export const validatePropertyId = [
  body('propertyId').isInt({ min: 1 }).withMessage('propertyId must be a positive integer'),
]
