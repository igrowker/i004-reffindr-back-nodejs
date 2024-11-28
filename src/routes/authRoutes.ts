import { Router } from 'express'
import { handleRegister, handleLogin } from '../controllers/userController'
import validateLogin  from '../middlewares/validateLogin'
import validateRegister from '../middlewares/validateRegister'


const router = Router()

router.post('/register', validateRegister, handleRegister)

router.post('/login', validateLogin, handleLogin)

export default router