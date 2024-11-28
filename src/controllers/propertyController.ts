import { Request, Response } from 'express'

import { createProperty, getProperties } from '../services/propertyService'
import { BaseResponse } from '../shared/utils/baseResponse'

export const createPropertyHandler = async (req: Request, res: Response) => {
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
    const response = await createProperty(propertyData, req.query.ownerEmail as string, req.headers['Authorization'] as string)
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
