import { Request, Response } from 'express'

import { createProperty, getProperties } from '../services/propertyService'

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

  const response = await createProperty(
    propertyData,
    req.query.ownerEmail as string,
    req.headers['Authorization'] as string
  )

  return res.status(response.statusCode).json(response.data)
}

export const getPropertiesHandler = async (req: Request, res: Response) => {
  const { CountryId, StateId, PriceMin, PriceMax, IsWorking, HasWarranty, RangeSalaryMin, RangeSalaryMax, Title } =
    req.query

  const response = await getProperties(
    { CountryId, StateId, PriceMin, PriceMax, IsWorking, HasWarranty, RangeSalaryMin, RangeSalaryMax, Title },
    req.headers['Authorization'] as string
  )

  return res.status(response.statusCode).json(response.data)
}

export const getFilteredPropertiesHandler = async (req: Request, res: Response) => {
  const filters = req.query
  const authorization = req.headers['Authorization'] as string

  const response = await getProperties(filters, authorization)
  return res.status(response.statusCode).json(response.data)
}
