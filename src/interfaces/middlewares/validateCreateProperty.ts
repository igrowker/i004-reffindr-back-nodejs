import { check, ValidationChain } from 'express-validator'

const validateCreateProperty: ValidationChain[] = [
  check('countryId').notEmpty().withMessage('Debe seleccionar un país'),
  check('stateId').notEmpty().withMessage('Debe seleccionar una provincia'),
  check('title')
    .notEmpty()
    .withMessage('Debe ingresar un nombre de propiedad')
    .isString()
    .withMessage('Debe ingresar un nombre de propiedad válido')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nopmbre de la propiedad debe tener enrtre 2 y 50 letras.'),
  check('address')
    .notEmpty()
    .withMessage('Debe ingresar una dirección')
    .isString()
    .withMessage('Debe ingresar una dirección válida.')
    .isLength({ min: 2, max: 50 })
    .withMessage('La dirección ingresada debe tener enrtre 2 y 50 letras.'),
  check('environments').notEmpty().withMessage('Debe seleccionar un número de ambientes'),
  check('bathrooms').notEmpty().withMessage('Debe seleccionar un número de baños'),
  check('bedrooms').notEmpty().withMessage('Debe seleccionar un número de habitaciones'),
  check('seniority').notEmpty().withMessage('Debe seleccionar un año de antiguedad'),
  check('description')
    .notEmpty()
    .withMessage('Debe ingresar una descripción')
    .isString()
    .withMessage('Debe ingresar una descripción válida.')
    .isLength({ min: 2, max: 50 })
    .withMessage('La descripción ingresada debe tener enrtre 2 y 50 letras.'),
  check('requirementPostRequestDto.rangeSalary')
    .notEmpty()
    .withMessage('Debe seleccionar un rango salarial')
    .withMessage('Debe seleccionar un número.'),
]

export default validateCreateProperty
