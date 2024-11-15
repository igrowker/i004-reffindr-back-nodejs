import { Request, Response } from 'express'
import axios from 'axios'
import router from './authController'

const BACKEND_URL = process.env.BACKEND_URL

export const getProperties = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/properties`, { params: req.query })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener propiedades.' })
  }
}

export const createProperty = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/properties`, req.body)
    res.status(201).json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la propiedad.' })
  }
}

export default router