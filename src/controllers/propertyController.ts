import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { createProperty, getProperties } from '../services/propertyService'
import { BaseResponse } from '../shared/utils/baseResponse'

export const createPropertyHandler = async (req: Request, res: Response) => {
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

  const propertyData = {
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
  }

  try {
    const response = await createProperty(propertyData, ownerEmail as string, req.headers['Authorization'] as string)
    return res.status(response.statusCode).json(response.data)
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

export const getPropertiesHandler = async (req: Request, res: Response) => {
  try {
    const { CountryId, StateId, PriceMin, PriceMax, IsWorking, HasWarranty, RangeSalaryMin, RangeSalaryMax, Title } =
      req.query

    const response = await getProperties(
      { CountryId, StateId, PriceMin, PriceMax, IsWorking, HasWarranty, RangeSalaryMin, RangeSalaryMax, Title },
      req.headers['Authorization'] as string
    )
    return res.status(response.statusCode).json(response.data)
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
}
