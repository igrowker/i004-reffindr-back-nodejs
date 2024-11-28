import { Router } from 'express'

import { createApplicationHandler, getApplicationsByPropertyHandler, getApplicationsByUserHandler } from '../controllers/applicationController'
import { validatePropertyId } from '../middlewares/validatePropertyId'
import { handleValidationErrors } from '../middlewares/validationErrorMiddleware'



const router = Router()

router.post('/', validatePropertyId, handleValidationErrors, createApplicationHandler)

router.get('/property/:propertyId', validatePropertyId, handleValidationErrors, getApplicationsByPropertyHandler)

router.get('/user/:userId', handleValidationErrors, getApplicationsByUserHandler)



export default router
