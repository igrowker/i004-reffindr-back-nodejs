import { Request, Response, Router } from 'express'
import { validationResult } from 'express-validator'

import { BaseResponse } from '../../shared/utils/baseResponse'
import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import validateUpdateUser from '../middlewares/validateUpdateUser'
import httpClient from '../services/httpClient'

const router = Router()

router.get('/profile', tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await httpClient.get(`/Users/get-credentials`, {
      headers: {
        Authorization: req.headers['Authorization'],
      },
    })

    if (response.status === 404) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        statusCode: response.status,
        hasErrors: false,
        errors: [],
      })
    )
  } catch (error: any) {
    return res
      .status(error.response?.status || 500)
      .json({ error: error.response?.data || 'Error interno del servidor' })
  }
})

router.patch('/profile/:id', validateUpdateUser, async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { name, surname, email, password } = req.body
  const { id } = req.params

  try {
    const response = await httpClient.patch(`/users/${id}`, {
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
})

router.delete('/profile/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const response = await httpClient.delete(`/users/${id}`)

    return res.status(response.status).json(response.data)
  } catch (error: any) {
    return res
      .status(error.response?.status || 500)
      .json({ error: error.response?.data || 'Error interno del servidor' })
  }
})

export default router
