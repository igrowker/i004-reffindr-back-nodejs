import { Router } from 'express'

import { createPropertyHandler, getPropertiesHandler, getFilteredPropertiesHandler } from '../controllers/propertyController'
import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import validateCreateProperty from '../middlewares/validateCreateProperty'
import { validatePropertyFilters } from '../middlewares/validatePropertyFilters'
import { validateOwnerEmail } from '../middlewares/validateOwnerEmail'
import { handleValidationErrors } from '../middlewares/validationErrorMiddleware'


const router = Router()

router.post('/create-property', tokenMiddleware, validateOwnerEmail, validateCreateProperty, handleValidationErrors, createPropertyHandler)

router.get('/get-properties', tokenMiddleware, getPropertiesHandler)
<<<<<<< Updated upstream
=======
router.get('/filter-properties', validatePropertyFilters, handleValidationErrors, getFilteredPropertiesHandler)
>>>>>>> Stashed changes

export default router
