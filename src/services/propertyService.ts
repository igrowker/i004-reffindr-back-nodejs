import httpClient from './httpClient'
import { BaseResponse } from '../shared/utils/baseResponse';


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

interface ApiResponse<T> {
  data: T
  statusCode: number
  message?: string
}

//METHODS

export const createProperty = async (
  propertyData: PropertyData,
  ownerEmail: string,
  authorization: string
): Promise<ApiResponse<any>> => {
  const { data, status } = await httpClient.post(
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

  return {
    data,
    statusCode: status,
    message: 'Property created successfully',
  }
}

export const getProperties = async (
  filters: {
    CountryId?: number;
    StateId?: number;
    PriceMin?: number;
    PriceMax?: number;
    IsWorking?: boolean;
    HasWarranty?: boolean;
    RangeSalaryMin?: number;
    RangeSalaryMax?: number;
    Title?: string;
  } = {}, // Default to empty object for all properties.
  authorization: string
): Promise<BaseResponse> => {
  try {
    if (!authorization) {
      throw new Error('Authorization header is required.');
    }

    // Fetch properties from the .NET backend
    const { data, status } = await httpClient.get('/Properties', {
      params: filters,
      headers: { Authorization: authorization },
    });

    return new BaseResponse({
      data,
      statusCode: status,
      message: 'Properties fetched successfully',
    });
  } catch (error: any) {
    // Use the globalErrorHandler and BaseResponse to handle errors
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Failed to fetch properties.';
    throw new BaseResponse({
      errors: [message],
      hasErrors: true,
      statusCode: status,
    });
  }
};