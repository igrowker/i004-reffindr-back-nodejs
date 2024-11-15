import { Request, Response } from 'express'
import httpClient from '../services/httpClient'
import router from './authController'

const BACKEND_URL = process.env.BACKEND_URL

export const getProperties = async (req: Request, res: Response) => {
    const response = await  httpClient.get(`${BACKEND_URL}/properties`, { params: req.query })
    res.json(response.data)
}

export const getPropertyById = async (req: Request, res: Response) => {
      const { id } = req.params
      const response = await httpClient.get(`${BACKEND_URL}/properties/${id}`)
      res.json(response.data)
  };
  

export const createProperty = async (req: Request, res: Response) => {
    const response = await httpClient.post(`${BACKEND_URL}/properties`, req.body)
    res.status(201).json(response.data)
}

export const selectCandidates = async (req: Request, res: Response) => {
      const { propertyId } = req.params
      const response = await httpClient.post(`${BACKEND_URL}/select-candidates/${propertyId}`, req.body)
      res.status(200).json(response.data)
}

export default router