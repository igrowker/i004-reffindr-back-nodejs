import { Router } from 'express'

import { createPropertyHandler, getPropertiesHandler } from '../controllers/propertyController'
import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import validateCreateProperty from '../middlewares/validateCreateProperty'
import { validateOwnerEmail } from '../middlewares/validateOwnerEmail'

const router = Router()

router.post('/create-property', tokenMiddleware, validateOwnerEmail, validateCreateProperty, createPropertyHandler)

router.get('/get-properties', tokenMiddleware, getPropertiesHandler)

export default router
