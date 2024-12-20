import { check, ValidationChain } from 'express-validator';


// import { Request } from "express";

const validateRegister: ValidationChain[] = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Debe ingresar su nombre')
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/)
    .withMessage('El nombre solo puede contener letras')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre ingresado debe tener entre 2 y 50 letras.'),

  check('lastName')
    .trim()
    .notEmpty()
    .withMessage('Debe ingresar un apellido.')
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/)
    .withMessage('El apellido solo puede contener letras')
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido ingresado debe tener entre 2 y 50 letras.'),

  check('email')
    .notEmpty()
    .withMessage('Debe ingresar un mail.')
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),

  check('password')
    .notEmpty()
    .withMessage('Debe ingresar una contraseña.')
    .isLength({ min: 8, max: 16 })
    .withMessage('La contraseña ingresada debe tener entre 8 y 16 caracteres.')
    .custom((value) => {
      if (!/[A-Z]/.test(value)) {
        throw new Error('La contraseña ingresada debe contener mayúsculas.')
      }
      return true
    })
    .custom((value) => {
      if (!/[a-z]/.test(value)) {
        throw new Error('La contraseña ingresada debe contener minúsculas.')
      }
      return true
    })
    .custom((value) => {
      if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
        throw new Error('La contraseña ingresada debe contener números y letras.')
      }
      return true
    })
    .custom((value) => {
      if (!/[!@#$%^&*()\-_=+[\]{}|;:'",.<>?/`~\\]/.test(value)) {
        throw new Error('La contraseña ingresada debe contener un caracter especial.')
      }
      return true
    }),
]

export default validateRegister