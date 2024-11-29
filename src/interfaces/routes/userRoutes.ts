import { Router } from 'express'
import userController from '../controllers/userController'

const router = Router()

router.use(userController)

export default router
