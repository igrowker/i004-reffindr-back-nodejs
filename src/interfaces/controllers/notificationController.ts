import { Request, Response, Router } from "express";


const router = Router();


router.get('/Notification/ConfirmProperty', async (_req: Request,res: Response) => {
  console.log('Esto es una notificacion en prueba')
 res.send('Desde el fronted esto es una notificacion *-*')
})

export default router;