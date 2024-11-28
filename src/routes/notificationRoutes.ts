import { Router } from "express";

import notificationController from '../controllers/notificationController';

const router = Router();

router.use(notificationController);

export default router











/* import { Router } from 'express'
import authController from '../controllers/authController'

const router = Router()

router.use(authController)

export default router
 */