import { check, ValidationChain } from 'express-validator'

const validatePropertyFilters: ValidationChain[] = [
  check('CountryId').optional().isInt().withMessage('CountryId debe ser un número entero.'),
  check('StateId').optional().isInt().withMessage('StateId debe ser un número entero.'),

  check('PriceMin').optional().isFloat({ min: 0 }).withMessage('PriceMin debe ser un número mayor o igual a 0.'),

  check('PriceMax')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('PriceMax debe ser un número mayor o igual a 0.')
    .custom((value, { req }) => {
      if (req.body.PriceMin && value < req.body.PriceMin) {
        throw new Error('PriceMax no puede ser menor que PriceMin.')
      }
      return true
    }),
  check('IsWorking').optional().isBoolean().withMessage('IsWorking debe ser un valor booleano.'),
  check('HasWarranty').optional().isBoolean().withMessage('HasWarranty debe ser un valor booleano.'),

  check('RangeSalaryMin')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('RangeSalaryMin debe ser un número mayor o igual a 0.'),

  check('RangeSalaryMax')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('RangeSalaryMax debe ser un número mayor o igual a 0.')
    .custom((value, { req }) => {
      if (req.body.RangeSalaryMin && value < req.body.RangeSalaryMin) {
        throw new Error('RangeSalaryMax no puede ser menor que RangeSalaryMin.')
      }
      return true
    }),
    check('Title').optional().isString().withMessage('Title debe ser una cadena de texto.'),

]

export default validatePropertyFilters
