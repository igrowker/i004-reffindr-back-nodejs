import { check, ValidationChain } from "express-validator";
// import { Request } from "express";
// import db from "../";


const validateRegister: ValidationChain[] = [
  check("firstName")
  .trim()
  .notEmpty().withMessage('Debe ingresar su nombre')
  .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/).withMessage('El nombre solo puede contener letras')
  .isLength({ min: 2, max: 50 }).withMessage('El nombre ingresado debe tener entre 2 y 50 letras.'),
  
  check("lastName")
    .trim()
    .notEmpty().withMessage("Debe ingresar un apellido.")
    .isLength({ min: 2, max: 20 }).withMessage("El apellido ingresado debe tener entre 2 y 20 letras.")
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/).withMessage('El apellido solo puede contener letras')
    .isLength({ min: 2, max: 50 }).withMessage('El apellido ingresado debe tener entre 2 y 50 letras.'),

  check("email")
    .notEmpty().withMessage("Debe ingresar un mail.")
    .isEmail().withMessage('Debe ser un correo electrónico válido').normalizeEmail(),
    // .custom(async (value) => {
    //   const user = await db.User.findOne({ where: { email: value } });
    //   if (!user) {
    //     return true;
    //   }
    //   throw new Error("El mail ingresado ya está en uso.");
    // })

  check("password")
    .notEmpty().withMessage("Debe ingresar una contraseña.")
    .isLength({ min: 8, max: 25 }).withMessage("La contraseña ingresada debe tener entre 8 y 25 caracteres.")
    .custom((value) => {
      if (!(/[A-Z]/.test(value))) {
        throw new Error("La contraseña ingresada debe contener mayúsculas.");
      }
      return true;
    })
    .custom((value) => {
      if (!(/[a-z]/.test(value))) {
        throw new Error("La contraseña ingresada debe contener minúsculas.");
      }
      return true;
    })
    .custom((value) => {
      if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
        throw new Error("La contraseña ingresada debe contener números y letras.");
      }
      return true;
    })
    .custom((value) => {
        if (!(/[@$!%*?&]/.test(value))) {
            throw new Error("La contraseña ingresada debe contener un caracter especial.");
          }
          return true;
    }),

    check("confirm-password")
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      throw new Error("Las contraseñas no coinciden.");
    })

//   check("img")
//     .custom((value, { req }) => {
//       const file = (req as Request).file;
//       if (file && ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(file.mimetype.toLowerCase())) {
//         return true;
//       }
//       throw new Error("La imagen debe ser en formato PNG, JPEG, JPG o GIF.");
//     }),


];

export default validateRegister;