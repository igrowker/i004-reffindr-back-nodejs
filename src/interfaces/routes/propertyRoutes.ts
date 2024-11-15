import { Router } from 'express'
import propertyController from '../controllers/propertyController'

const router = Router()

router.use(propertyController)

export default router
