import { Request, Response, Router } from 'express'

import { BaseResponse } from '../../shared/utils/baseResponse'
import validateLogin from '../middlewares/validateLogin'
import validateRegister from '../middlewares/validateRegister'
import { validationError } from '../middlewares/validationError'
import httpClient from '../services/httpClient'

const router = Router()

router.post('/register', validateRegister, validationError, async (req: Request, res: Response) => {
  const { roleId, name, lastName, email, password } = req.body

  try {
    const response = await httpClient.post('/Auth/SignUp', {
      RoleId: roleId,
      Name: name,
      LastName: lastName,
      Email: email,
      Password: password,
    })

    return res.status(response.status).json(response.data)
  } catch (error: unknown) {
    return res.status(400).json(
      new BaseResponse({
        errors: ['Error al registrar el usuario.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.post('/login', validateLogin, validationError, async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const response = await httpClient.post('/Auth/Login', {
      Email: email,
      Password: password,
    })

    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        errors: [],
        hasErrors: false,
        statusCode: res.statusCode,
      })
    )
  } catch (error: unknown) {
    return res.status(400).json(
      new BaseResponse({
        errors: ['Credenciales incorrectas.'],
        hasErrors: true,
        statusCode: 401,
      })
    )
  }
})

export default router
