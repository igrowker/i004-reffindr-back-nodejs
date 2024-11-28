import { Router } from 'express'

import { createPropertyHandler, getPropertiesHandler } from '../controllers/propertyController'
import { tokenMiddleware } from '../middlewares/tokenMiddleware'
import validateCreateProperty from '../middlewares/validateCreateProperty'

const router = Router()

router.post('/create-property', tokenMiddleware, validateCreateProperty, createPropertyHandler)

router.get('/get-properties', tokenMiddleware, getPropertiesHandler)

export default router
