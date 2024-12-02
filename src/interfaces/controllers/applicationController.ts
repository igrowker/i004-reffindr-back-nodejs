import { Request, Response, Router } from 'express'

import { BaseResponse } from '../../shared/utils/baseResponse'
import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import { validationError } from '../middlewares/validationError'
import httpClient from '../services/httpClient'

const router = Router()

router.post('/create', validationError, tokenMiddleware, async (req: Request, res: Response) => {
  const { propertyId } = req.body
  if (!propertyId) {
    return res.status(400).json(
      new BaseResponse({
        errors: ['El ID (propertyId) no es válido'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
  try {
    const response = await httpClient.post(
      '/Application/PostApplication',
      { PropertyId: propertyId },
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    )
    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        errors: [],
        hasErrors: false,
        statusCode: response.status,
      })
    )
  } catch (error: unknown) {
    return res.status(400).json(
      new BaseResponse({
        errors: ['La aplicación no ha sido enviada correctamente'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.get('/candidates/:propertyId', tokenMiddleware, validationError, async (req: Request, res: Response) => {
  const { propertyId } = req.params

  if (!propertyId) {
    return res.status(400).json(
      new BaseResponse({
        errors: ['El ID (propertyId) no es válido'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
  try {
    const response = await httpClient.get(`/Application/SelectedCandidates/${propertyId}`, {
      headers: {
        Authorization: req.headers['authorization'],
      },
    })
    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        errors: [],
        hasErrors: false,
        statusCode: response.status,
      })
    )
  } catch (error: unknown) {
    console.log(error)
    return res.status(400).json(
      new BaseResponse({
        errors: ['Error al traer la aplicación'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.get('/property/:propertyId', tokenMiddleware, validationError, async (req: Request, res: Response) => {
  const { propertyId } = req.params

  if (!propertyId) {
    return res.status(400).json(
      new BaseResponse({
        errors: ['El ID (propertyId) no es válido'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
  try {
    const response = await httpClient.get(`/Application/Property/${propertyId}`, {
      headers: {
        Authorization: req.headers['authorization'],
      },
    })
    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        errors: [],
        hasErrors: false,
        statusCode: response.status,
      })
    )
  } catch (error: unknown) {
    console.log(error)
    return res.status(400).json(
      new BaseResponse({
        errors: ['Error al traer la aplicación'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.get('/user', tokenMiddleware, async (req: Request, res: Response) => {

  try {
    const response = await httpClient.get('/Application/User/', {
      headers: {
        Authorization: req.headers['Authorization'],
      },
    })

    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        errors: [],
        hasErrors: false,
        statusCode: response.status,
      })
    )
  } catch (error: unknown) {
    return res.status(400).json(
      new BaseResponse({
        errors: ['Error al traer la aplicación'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

export default router
