import { check, ValidationChain } from 'express-validator'

const validateLogin: ValidationChain[] = [
  check('username')
    .notEmpty()
    .withMessage('Debe ingresar un nombre de usuario.'),

  check('email')
    .isEmail()
    .withMessage('Debe ingresar un mail válido.'),

  check('password')
    .notEmpty()
    .withMessage('Debe ingresar una contraseña.'),
]

export default validateLogin