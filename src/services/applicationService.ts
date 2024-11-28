import httpClient from '../services/httpClient'

export const createApplication = async (propertyId: number) => {
  const { data, status } = await httpClient.post('/Application', {
    PropertyId: propertyId,
  })

  return {
    data,
    statusCode: status,
    message: 'Application created successfully',
  }
}

export const getApplicationsByProperty = async (propertyId: number) => {
    const { data } = await httpClient.get(`/Application/Property/${propertyId}`)
    return data
  }