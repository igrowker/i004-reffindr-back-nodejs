import { Router } from 'express'
import userController from '../controllers/userCrontoller'

const router = Router()

router.use(userController)

export default router
