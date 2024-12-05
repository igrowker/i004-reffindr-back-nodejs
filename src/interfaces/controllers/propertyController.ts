import { Request, Response, Router } from 'express'
import FormData from 'form-data'
import multer from 'multer'

import { BaseResponse } from '../../shared/utils/baseResponse'
import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import validateCreateProperty from '../middlewares/validateCreateProperty'
import { validationError } from '../middlewares/validationError'
import httpClient from '../services/httpClient'

const upload = multer()

const router = Router()

router.post(
  '/create-property',
  upload.array('images', 10),
  tokenMiddleware,
  validateCreateProperty,
  validationError,
  async (req: Request, res: Response) => {
    const {
      countryId,
      stateId,
      title,
      address,
      environments,
      bathrooms,
      bedrooms,
      seniority,
      water,
      gas,
      surveillance,
      electricity,
      internet,
      pool,
      garage,
      pets,
      grill,
      elevator,
      terrace,
      description,
      ownerEmail,
      price,
      requirementPostRequestDto: { isWorking, hasWarranty, rangeSalary },
    } = req.body

    const formData = new FormData()
    const propertyData = {
      CountryId: countryId,
      StateId: stateId,
      Title: title,
      Address: address,
      Environments: environments,
      Bathrooms: bathrooms,
      Bedrooms: bedrooms,
      Seniority: seniority,
      Water: water,
      Gas: gas,
      Surveillance: surveillance,
      Electricity: electricity,
      Internet: internet,
      Pool: pool,
      Garage: garage,
      Pets: pets,
      Grill: grill,
      Elevator: elevator,
      Terrace: terrace,
      OwnerEmail: ownerEmail,
      Price: price,
      Description: description,
      IsWorking: isWorking,
      HasWarranty: hasWarranty,
      RangeSalary: rangeSalary,
    }

    // Append each property to formData
    Object.entries(propertyData).forEach(([key, value]) => {
      formData.append(key, value)
    })

    if (Array.isArray(req.files)) {
      req.files.forEach((file: Express.Multer.File) => {
        formData.append('images', file.buffer, file.originalname)
      })
    }

    try {
      const response = await httpClient.post('/Properties/PostProperty', formData, {
        params: { ownerEmail },
        headers: {
          Authorization: req.headers['Authorization'],
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

router.get('/get-properties', tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const { CountryId, StateId, PriceMin, PriceMax, IsWorking, HasWarranty, RangeSalaryMin, RangeSalaryMax, Title } =
      req.query
    const response = await httpClient.get('/Properties/GetProperty', {
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
  const { userId, propertyId } = req.query

  try {
    const response = await httpClient.post(
      '/Properties/AddFavorite',
      {},
      {
        headers: {
          Authorization: req.headers['Authorization'],
        },
        params: { userId, propertyId },
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

export default router
