import { check, ValidationChain } from 'express-validator'

const validateLogin: ValidationChain[] = [
  check('email').isEmail().withMessage('Debe ingresar un mail válido.'),

  check('password').notEmpty().withMessage('Debe ingresar una contraseña.'),
]

export default validateLogin
