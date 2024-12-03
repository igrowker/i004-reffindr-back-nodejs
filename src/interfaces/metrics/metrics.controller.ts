import { Router, Response } from 'express';
import { getMetrics } from './metrics.service';
import client from 'prom-client';
import { BaseResponse } from '../../shared/utils/baseResponse';

const metricsController = Router();

metricsController.get('/', async (_req, res: Response): Promise<void> => {
  try {
    const metrics = await getMetrics();
    res.setHeader('Content-Type', client.register.contentType);
    res.status(200).json(
      new BaseResponse({
        data: metrics,
        errors: [],
        hasErrors: false,
        statusCode: 200,
      })
    );
  } catch (error: any) {
    new BaseResponse({
        data: null,
        errors: ['Error al obtener métricas', error.message || error],
        hasErrors: true,
        statusCode: 500,
      })
  }
});

export default metricsController;
