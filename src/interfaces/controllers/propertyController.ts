import { Request, Response, Router } from 'express'
import FormData from 'form-data'
import multer from 'multer'

import { BaseResponse } from '../../shared/utils/baseResponse'
import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import { validationError } from '../middlewares/validationError'
import httpClient from '../services/httpClient'

//import validateCreateProperty from '../middlewares/validateCreateProperty'

const upload = multer({
  storage: multer.memoryStorage(),
})

const router = Router()
router.post(
  '/create-property',
  upload.array('Images', 10),
  // validateCreateProperty,
  tokenMiddleware,
  validationError,
  async (req: Request, res: Response) => {
    const formData = new FormData()

    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file: Express.Multer.File) => {
        formData.append('Images', file.buffer, file.originalname)
      })
    }

    const fields = [
      'CountryId',
      'StateId',
      'Title',
      'Address',
      'Environments',
      'Bathrooms',
      'Bedrooms',
      'Seniority',
      'Description',
      'OwnerEmail',
      'Price',
    ]

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        formData.append(field, req.body[field].toString())
      }
    })

    const booleanFields = [
      'Water',
      'Gas',
      'Surveillance',
      'Electricity',
      'Internet',
      'Pool',
      'Garage',
      'Pets',
      'Grill',
      'Elevator',
      'Terrace',
    ]

    booleanFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        formData.append(field, req.body[field] === 'true' || req.body[field] === true ? 'true' : 'false')
      }
    })

    const requirementFields = {
      'RequirementPostRequestDto[IsWorking]': req.body.RequirementPostRequestDto?.IsWorking || false,
      'RequirementPostRequestDto[HasWarranty]': req.body.RequirementPostRequestDto?.HasWarranty || false,
      'RequirementPostRequestDto[RangeSalary]': req.body.RequirementPostRequestDto?.RangeSalary || 0,
    }

    Object.entries(requirementFields).forEach(([key, value]) => {
      formData.append(key, value.toString())
    })

    try {
      const response = await httpClient.post(`/Properties/PostProperty`, formData, {
        headers: {
          Authorization: req.headers['authorization'],
          ...formData.getHeaders(),
        },
      })

      return res.status(response.status).json(
        new BaseResponse({
          data: response.data,
          statusCode: response.status,
          hasErrors: false,
          errors: [],
        })
      )
    } catch (error: unknown) {
      console.error('Error al registrar la propiedad:', error)

      return res.status(400).json(
        new BaseResponse({
          errors: ['Error al registrar la propiedad.'],
          hasErrors: true,
          statusCode: res.statusCode,
        })
      )
    }
  }
)
router.get('/get-property/:propertyId', tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params
    console.log(propertyId)
    const response = await httpClient.get(`/Properties/GetProperty/${propertyId}`)
    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        statusCode: response.status,
        hasErrors: false,
        errors: [],
      })
    )
  } catch (error) {
    return res.status(404).json(
      new BaseResponse({
        errors: ['No se encontraron propiedades que coincidan con su búsqueda.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.get('/get-properties', tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const { CountryId, StateId, PriceMin, PriceMax, IsWorking, HasWarranty, RangeSalaryMin, RangeSalaryMax, Title } =
      req.query
    const response = await httpClient.get('/Properties/GetProperties', {
      params: { CountryId, StateId, PriceMin, PriceMax, IsWorking, HasWarranty, RangeSalaryMin, RangeSalaryMax, Title },
      headers: {
        Authorization: req.headers['Authorization'],
      },
    })

    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        statusCode: response.status,
        hasErrors: false,
        errors: [],
      })
    )
  } catch (error: unknown) {
    return res.status(404).json(
      new BaseResponse({
        errors: ['No se encontraron propiedades que coincidan con su búsqueda.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.get('/get-favorites-properties', tokenMiddleware, async (req: Request, res: Response) => {
  const { userId } = req.query

  try {
    const response = await httpClient.get('/Properties/GetFavoriteProperties', {
      headers: {
        Authorization: req.headers['Authorization'],
      },
      params: { userId },
    })

    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        statusCode: response.status,
        hasErrors: false,
        errors: [],
      })
    )
  } catch (error: unknown) {
    console.log(error)
    return res.status(404).json(
      new BaseResponse({
        errors: ['No se encontraron propiedades favoritas.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.post('/add-favorite', tokenMiddleware, async (req: Request, res: Response) => {
  const { propertyId } = req.query

  try {
    const response = await httpClient.post(
      '/Properties/AddFavorite',
      {},
      {
        headers: {
          Authorization: req.headers['Authorization'],
        },
        params: { propertyId },
      }
    )

    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        statusCode: response.status,
        hasErrors: false,
        errors: [],
      })
    )
  } catch (error: unknown) {
    console.log(error)
    const err = error as { response?: { status?: number; data?: { error?: string } } }
    return res.status(err.response?.status || 500).json(
      new BaseResponse({
        errors: [err.response?.data?.error || 'Error al agregar propiedad a favoritos.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.post('/remove-favorite', tokenMiddleware, async (req: Request, res: Response) => {
  const { propertyId } = req.query

  try {
    const response = await httpClient.post(
      '/Properties/RemoveFavorite',
      {},
      {
        headers: {
          Authorization: req.headers['Authorization'],
        },
        params: { propertyId },
      }
    )

    return res.status(response.status).json(
      new BaseResponse({
        data: response.data,
        statusCode: response.status,
        hasErrors: false,
        errors: [],
      })
    )
  } catch (error: unknown) {
    console.log(error)
    const err = error as { response?: { status?: number; data?: { error?: string } } }
    return res.status(err.response?.status || 500).json(
      new BaseResponse({
        errors: [err.response?.data?.error || 'Error al eliminar propiedad de favoritos.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

export default router
