import { Router, Request, Response } from 'express'

import { validationResult } from 'express-validator'

import httpClient from '../services/httpClient'
import validateUpdateUser from '../middlewares/validateUpdateUser'

const router = Router()

router.get('/profile/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const response = await httpClient.get(`/users/user/${id}`)

    if (response.status === 404) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    return res.status(response.status).json(response.data)
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
