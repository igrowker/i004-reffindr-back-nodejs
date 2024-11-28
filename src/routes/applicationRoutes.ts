import { Router } from 'express'

import { createApplicationHandler, getApplicationsByPropertyHandler } from '../controllers/applicationController'
// import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import { validatePropertyId } from '../middlewares/validatePropertyId'
import { handleValidationErrors } from '../middlewares/validationErrorMiddleware'



const router = Router()

router.post('/', validatePropertyId, handleValidationErrors, createApplicationHandler)

router.get('/property/:propertyId', validatePropertyId, handleValidationErrors, getApplicationsByPropertyHandler)


export default router
