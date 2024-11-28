import { Request, Response } from 'express'
import { createApplication, getApplicationsByProperty } from '../services/applicationService'
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
