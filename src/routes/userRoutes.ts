import { Router } from 'express'

import { deleteUser, getUser, updateUser } from '../controllers/userController'
import { validateUpdateUser } from '../middlewares/validateUpdateUser'
import { handleValidationErrors } from '../middlewares/validationErrorMiddleware'

const router = Router()

router.get('/profile/:id', getUser)
router.patch('/profile/:id', validateUpdateUser, handleValidationErrors, updateUser)
router.delete('/profile/:id', handleValidationErrors, deleteUser)

export default router
