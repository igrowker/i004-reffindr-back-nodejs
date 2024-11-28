import { Router } from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/userController';
import { validateUpdateUser } from '../middlewares/validateUpdateUser'

const router = Router();

router.get('/profile/:id', getUser);
router.patch('/profile/:id', validateUpdateUser, updateUser);
router.delete('/profile/:id', deleteUser);

export default router;