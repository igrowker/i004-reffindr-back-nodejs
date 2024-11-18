import { Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import httpClient from '../services/httpClient'
import validateRegister from '../middlewares/validateRegister'

const router = Router()

router.post('/register', validateRegister, async (req: Request, res: Response) => {
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
})

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const response = await httpClient.post('/users/login', {
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

export default router
