import { Router } from 'express'

import { confirmProperty } from '../controllers/notificationController'
import { validateAuthorization } from '../middlewares/validateNotification'

const router = Router()

router.put('/confirm/:propertyId', validateAuthorization, confirmProperty)

export default router
