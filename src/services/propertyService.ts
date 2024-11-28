import { AxiosResponse } from 'axios'

import httpClient from './httpClient'

interface PropertyData {
  countryId: number
  stateId: number
  title: string
  address: string
  environments: number
  bathrooms: number
  bedrooms: number
  seniority: string
  water: boolean
  gas: boolean
  surveillance: boolean
  electricity: boolean
  internet: boolean
  pool: boolean
  garage: boolean
  pets: boolean
  grill: boolean
  elevator: boolean
  terrace: boolean
  description: string
  requirementPostRequestDto: {
    isWorking: boolean
    hasWarranty: boolean
    rangeSalary: string
  }
}

export const createProperty = async (
  propertyData: PropertyData,
  ownerEmail: string,
  authorization: string
): Promise<AxiosResponse> => {
  if (!ownerEmail || typeof ownerEmail !== 'string') {
    throw new Error('El correo del propietario (ownerEmail) es obligatorio y debe ser un string.')
  }

  const response = await httpClient.post(
    '/Properties/PostProperty',
    {
      CountryId: propertyData.countryId,
      StateId: propertyData.stateId,
      Title: propertyData.title,
      Address: propertyData.address,
      Environments: propertyData.environments,
      Bathrooms: propertyData.bathrooms,
      Bedrooms: propertyData.bedrooms,
      Seniority: propertyData.seniority,
      Water: propertyData.water,
      Gas: propertyData.gas,
      Surveillance: propertyData.surveillance,
      Electricity: propertyData.electricity,
      Internet: propertyData.internet,
      Pool: propertyData.pool,
      Garage: propertyData.garage,
      Pets: propertyData.pets,
      Grill: propertyData.grill,
      Elevator: propertyData.elevator,
      Terrace: propertyData.terrace,
      Description: propertyData.description,
      RequirementPostRequestDto: propertyData.requirementPostRequestDto,
    },
    {
      params: { ownerEmail },
      headers: { Authorization: authorization },
    }
  )

  return response
}

export const getProperties = async (filters: any, authorization: string): Promise<AxiosResponse> => {
  const response = await httpClient.get('/Properties', {
    params: filters,
    headers: { Authorization: authorization },
  })
  return response
}
