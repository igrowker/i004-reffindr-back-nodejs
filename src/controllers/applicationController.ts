import { Request, Response } from 'express'

import { createApplication, getApplicationsByProperty } from '../services/applicationService'
import { BaseResponse } from '../shared/utils/baseResponse'

export const createApplicationHandler = async (req: Request, res: Response) => {
  const { propertyId } = req.body
  const application = await createApplication(propertyId)
  return res.status(201).json(
    new BaseResponse({
      data: application,
      message: 'Application created successfully',
      statusCode: 201,
    })
  )
}

export const getApplicationsByPropertyHandler = async (req: Request, res: Response) => {
  const { propertyId } = req.params
  const applications = await getApplicationsByProperty(+propertyId)
  res.status(200).json(applications)
}
