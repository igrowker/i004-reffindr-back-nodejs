import { Router } from 'express'

import { handleLogin, handleRegister } from '../controllers/userController'
import validateLogin from '../middlewares/validateLogin'
import validateRegister from '../middlewares/validateRegister'
import { handleValidationErrors } from '../middlewares/validationErrorMiddleware'

const router = Router()

router.post('/register', validateRegister, handleValidationErrors, handleRegister)
router.post('/login', validateLogin, handleValidationErrors, handleLogin)

export default router
