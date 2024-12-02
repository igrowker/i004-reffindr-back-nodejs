import { Router } from 'express'
import applicationController from '../controllers/applicationController'

const router = Router()

router.use(applicationController)

export default router
