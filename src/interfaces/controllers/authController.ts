import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import httpClient from '../../shared/config/axiosConfig'

const router = Router()

router.post(
  '/register',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('El nombre no puede estar vacio')
      .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/)
      .isLength({ min: 2, max: 50 })
      .withMessage('El nombre solo puede contener letras'),
    body('surname')
      .trim()
      .notEmpty()
      .withMessage('El apellido no puede estar vacio')
      .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/)
      .isLength({ min: 2, max: 50 })
      .withMessage('El apellido solo puede contener letras'),
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido').normalizeEmail(),
    body('password')
      .isLength({ min: 4, max: 16 })
      .withMessage('La contraseña debe tener entre 4 y 16 caracteres')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,16}$/)
      .withMessage(
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'
      ),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, surname, email, password } = req.body

    try {
      const response = await httpClient.post('/users/register', {
        name,
        surname,
        email,
        password,
      })

      return res.status(response.status).json(response.data)
    } catch (error: any) {
      return res
        .status(error.response?.status || 500)
        .json({ error: error.response?.data || 'Error interno del servidor' })
    }
  }
)

export default router
