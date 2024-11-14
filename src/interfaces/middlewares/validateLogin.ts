import { check, ValidationChain } from 'express-validator'
// import bcrypt from 'bcryptjs'
// import db from '../model/models'

const validateLogin: ValidationChain[] = [
  check('username')
    .notEmpty()
    .withMessage('Debe ingresar un nombre de usuario.')
    // .custom(async (value) => {
    //   const user = await db.User.findOne({ where: { username: value } })
    //   if (!user) {
    //     throw new Error('Usuario no encontrado.')
    //   }
    //   return true
    // })
    ,

  check('email')
    .isEmail()
    .withMessage('Debe ingresar un mail válido.')
    // .custom(async (value) => {
    //   const user = await db.User.findOne({ where: { email: value } })
    //   if (!user) {
    //     throw new Error('Mail no encontrado.')
    //   }
    //   return true
    // })
    ,

  check('password')
    .notEmpty()
    .withMessage('Debe ingresar una contraseña.')
    // .custom(async (value, { req }) => {
    //   const user = await db.User.findOne({ where: { email: req.body.email, username: req.body.username } })
    //   if (user && bcrypt.compareSync(value, user.password)) {
    //     return true
    //   }
    //   throw new Error('Contraseña incorrecta.')
    // })
    ,
]

export default validateLogin