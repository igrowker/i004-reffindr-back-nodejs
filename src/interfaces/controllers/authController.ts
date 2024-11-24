import { Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import httpClient from '../services/httpClient'
import validateRegister from '../middlewares/validateRegister'
import validateLogin from '../middlewares/validateLogin'
import { BaseResponse } from '../../shared/utils/baseResponse'

const router = Router()

router.post('/register', validateRegister, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorsValidation = errors.array().map((error) => error.msg)

    return res.status(400).json(
      new BaseResponse({
        errors: errorsValidation,
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }

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
  } catch (error: any) {
    return res
      .status(error.response?.status || 500)
      .json({ error: error.response?.data || 'Error interno del servidor' })
  }
})

router.post('/login', validateLogin, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorsValidation = errors.array().map((error) => error.msg)

    return res.status(400).json(
      new BaseResponse({
        errors: errorsValidation,
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }

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
  } catch (error: any) {
    return res.status(error.response?.status).json(
      new BaseResponse({
        errors: ['Credenciales incorrectas.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

export default router
