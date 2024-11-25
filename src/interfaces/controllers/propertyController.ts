import { Request, Response, Router } from 'express'
import { validationResult } from 'express-validator'

import { BaseResponse } from '../../shared/utils/baseResponse'
import validateCreateProperty from '../middlewares/validateCreateProperty'
import httpClient from '../services/httpClient'

const router = Router()

router.post('/properties/createProperty', validateCreateProperty, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorsValidation = errors.array().map((error) => error.msg)

    return res.status(400).json(
      new BaseResponse({
        errors: errorsValidation,
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
    const response = await httpClient.post('/Properties/PostProperty', {
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
    })

    return res.status(response.status).json(response.data)
  } catch (error: unknown) {
    return res.status(400).json(
      new BaseResponse({
        errors: ['Error al registrar la propiedad.'],
        hasErrors: true,
        statusCode: res.statusCode,
      })
    )
  }
})

router.get('/properties/getProperties', async (_req: Request, res: Response) => {
  try {
    const response = await httpClient.get('/Properties')
    return res.status(response.status).json(response.data)
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

export default router
