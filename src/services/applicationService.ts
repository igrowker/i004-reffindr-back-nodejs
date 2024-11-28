import httpClient from '../services/httpClient'
import { BaseResponse } from '../shared/utils/baseResponse'

export const createApplication = async (propertyId: number) => {
  try {
    const { data, status } = await httpClient.post('/Application', {
      PropertyId: propertyId,
    })

    return new BaseResponse({
      data,
      message: 'Application created successfully',
      statusCode: status,
    })
  } catch (error: any) {
    console.error(error)
    throw new BaseResponse({
      data: null,
      errors: [error.response?.data?.message || 'Failed to create application'],
      hasErrors: true,
      statusCode: 500,
    })
  }
}

export const getApplicationsByProperty = async (propertyId: number) => {
  try {
    const { data } = await httpClient.get(`/Application/Property/${propertyId}`)
    return new BaseResponse({
      data,
      message: 'Applications fetched successfully',
      statusCode: 200,
    })
  } catch (error: any) {
    console.error(error)
    throw new BaseResponse({
      data: null,
      errors: [error.response?.data?.message || 'Failed to fetch applications'],
      hasErrors: true,
      statusCode: 500,
    })
  }
}
