import { Router } from 'express'

import { createPropertyHandler, getPropertiesHandler } from '../controllers/propertyController'
import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import { validateOwnerEmail } from '../middlewares/validateOwnerEmail'
import validateCreateProperty from '../middlewares/validateCreateProperty'
import validatePropertyFilters from '../middlewares/validatePropertyFilters'
import { handleValidationErrors } from '../middlewares/validationErrorMiddleware'


const router = Router()

router.post('/create-property', tokenMiddleware, validateOwnerEmail, validateCreateProperty, handleValidationErrors, createPropertyHandler)

router.get('/get-properties', tokenMiddleware, validatePropertyFilters, handleValidationErrors, getPropertiesHandler)

export default router
