import { Request, Response, Router } from 'express'

import { BaseResponse } from '../../shared/utils/baseResponse'
import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import validateCreateProperty from '../middlewares/validateCreateProperty'
import { validationError } from '../middlewares/validationError'
import httpClient from '../services/httpClient'

const router = Router()
router.post(
  '/create-property',
  tokenMiddleware,
  validateCreateProperty,
  validationError,
  async (req: Request, res: Response) => {
    const { ownerEmail } = req.query
    if (!ownerEmail || typeof ownerEmail !== 'string') {
      return res.status(400).json(
        new BaseResponse({
          errors: ['El correo del propietario (ownerEmail) es obligatorio y debe ser un string.'],
          hasErrors: true,
          statusCode: res.statusCode,
        })
      )
    }
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
      requirementPostRequestDto: { isWorking, hasWarranty, rangeSalary },
    } = req.body
    try {
      const response = await httpClient.post(
        '/Properties/PostProperty',
        {
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
          Description: description,
          RequirementPostRequestDto: {
            IsWorking: isWorking,
            HasWarranty: hasWarranty,
            RangeSalary: rangeSalary,
          },
        },
        {
          params: { ownerEmail },
          headers: {
            Authorization: req.headers['Authorization'],
          },
        }
      )
      return res.status(response.status).json(response.data)
    } catch (error: unknown) {
      console.error(error)
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
    const response = await httpClient.get('/Properties', {
      params: { CountryId, StateId, PriceMin, PriceMax, IsWorking, HasWarranty, RangeSalaryMin, RangeSalaryMax, Title },
      headers: {
        Authorization: req.headers['Authorization'],
      },
    })

    return res.status(response.status).json(response.data)
  } catch (error: unknown) {
    console.log(error)
    return res.status(404).json(
      new BaseResponse({
        errors: ['No se encontraron propiedades que coincidan con su búsqueda.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

export default router
