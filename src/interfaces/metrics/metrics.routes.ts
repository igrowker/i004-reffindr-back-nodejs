import { Router } from 'express'
import metricsController from '../metrics/metrics.controller'

const router = Router()

router.use(metricsController)

export default router
