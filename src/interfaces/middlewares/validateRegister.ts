import { check, ValidationChain } from "express-validator";
// import { Request } from "express";
// import db from "../";


const validateRegister: ValidationChain[] = [
  check("firstName")
    .notEmpty().withMessage("Debe ingresar un nombre.")
    .isLength({ min: 2, max: 20 }).withMessage("El nombre ingresado debe tener entre 2 y 20 letras."),

  check("lastName")
    .notEmpty().withMessage("Debe ingresar un apellido.")
    .isLength({ min: 2, max: 20 }).withMessage("El apellido ingresado debe tener entre 2 y 20 letras."),

  check("username")
    .notEmpty().withMessage("Debe ingresar un nombre de usuario.")
    .isLength({ min: 5, max: 15 }).withMessage("El nombre de usuario ingresado debe tener entre 5 y 15 letras.")
    // .custom(async (value) => {
    //   const user = await db.User.findOne({ where: { username: value } });
    //   if (!user) {
    //     return true;
    //   }
    //   throw new Error("El nombre de usuario ingresado ya está en uso.");
    // })
    ,

  check("email")
    .notEmpty().withMessage("Debe ingresar un mail.")
    .isEmail().withMessage("Debe ingresar un mail válido.")
    // .custom(async (value) => {
    //   const user = await db.User.findOne({ where: { email: value } });
    //   if (!user) {
    //     return true;
    //   }
    //   throw new Error("El mail ingresado ya está en uso.");
    // })
    ,

  check("password")
    .notEmpty().withMessage("Debe ingresar una contraseña.")
    .isLength({ min: 8, max: 25 }).withMessage("La contraseña ingresada debe tener entre 8 y 25 letras.")
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
    }),

//   check("image")
//     .custom((value, { req }) => {
//       const file = (req as Request).file;
//       if (file && ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(file.mimetype.toLowerCase())) {
//         return true;
//       }
//       throw new Error("La imagen debe ser en formato PNG, JPEG, JPG o GIF.");
//     }),

  check("confirm-password")
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      throw new Error("Las contraseñas no coinciden.");
    })
];

export default validateRegister;
