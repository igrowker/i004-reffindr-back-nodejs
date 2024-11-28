import { Request, Response } from 'express'
import { createApplication, getApplicationsByProperty, getApplicationsByUser } from '../services/applicationService'
import { BaseResponse } from '../shared/utils/baseResponse'

export const createApplicationHandler = async (req: Request, res: Response) => {
  const { propertyId } = req.body

  try {
    const application = await createApplication(propertyId)
    return res.status(201).json(
      new BaseResponse({
        data: application,
        message: 'Application created successfully',
        statusCode: 201,
      })
    )
  } catch (error: any) {
    console.error(error)
    return res.status(500).json(
      new BaseResponse({
        data: null,
        errors: [error.message || 'Error creating application'],
        hasErrors: true,
        statusCode: 500,
      })
    )
  }
}

export const getApplicationsByPropertyHandler = async (req: Request, res: Response) => {
  const { propertyId } = req.params

  try {
    const applications = await getApplicationsByProperty(+propertyId)
    return res.status(200).json(
      new BaseResponse({
        data: applications,
        message: 'Applications fetched successfully',
        statusCode: 200,
      })
    )
  } catch (error: any) {
    console.error(error)
    return res.status(500).json(
      new BaseResponse({
        data: null,
        errors: [error.message || 'Error fetching applications'],
        hasErrors: true,
        statusCode: 500,
      })
    )
  }
}

export const getApplicationsByUserHandler = async (req: Request, res: Response) => {
  const { userId } = req.params 

  try {
    const response = await getApplicationsByUser(+userId)
    return res.status(response.statusCode).json(new BaseResponse({
      data: response.data,
      errors: [],
      hasErrors: false,
      statusCode: response.statusCode
    }))
  } catch (error: any) {
    return res.status(error.statusCode || 500).json(new BaseResponse({
      data: null,
      errors: [error.message || 'Internal Server Error'],
      hasErrors: true,
      statusCode: error.statusCode || 500
    }))
  }
}