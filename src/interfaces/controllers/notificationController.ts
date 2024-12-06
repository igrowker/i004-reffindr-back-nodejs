import { Request, Response } from 'express'

import httpClient from '../services/httpClient'

const confirmPropertyFromNotification = async (propertyId: number, token: string) => {
  try {
    //console.log(`Calling .NET API with propertyId: ${propertyId}`)

    const response = await httpClient.put(
      `/Notification/ConfirmProperty/${propertyId}`,
      {},
      {
        headers: { Authorization: token },
      }
    )

    //console.log('Response from .NET API:', response.data)
    return response.data
  } catch (error) {
    //console.error('Error in confirmPropertyFromNotification:', error)

    throw new Error(error instanceof Error ? error.message : 'Error confirming property')
  }
}

// Controlador para confirmar propiedad desde una notificación
export const confirmProperty = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params
    const token = req.headers['validated-token'] as string

    //console.log(`Confirming property with ID: ${propertyId}`)

    const result = await confirmPropertyFromNotification(+propertyId, token)

    if (!result) {
      //console.warn(`Property with ID ${propertyId} not found or confirmation failed`)
      return res.status(404).json({ message: 'Property not found or could not be confirmed' })
    }

    //console.log('Property confirmed successfully:', result)
    return res.json(result)
  } catch (error) {
    //console.error('Error confirming property:', error)

    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
