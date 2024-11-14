import { Router } from 'express'
import httpClient from '../../shared/config/axiosConfig'

const router = Router()

router.post('/register', async (req, res) => {
  const { name, surname, email, password } = req.body

  try {
    const response = await httpClient.post('/users/register', {
      name,
      surname,
      email,
      password,
    })

    res.status(response.status).json(response.data)
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ error: error.response?.data || 'Error interno del servidor' })
  }
})

export default router
