import { Request, Response, NextFunction } from 'express';
import client from 'prom-client';

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Cantidad total de solicitudes HTTP',
  labelNames: ['method', 'path', 'status'],
});

const httpRequestDurationHistogram = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duración de las solicitudes HTTP en segundos',
  labelNames: ['method', 'path', 'status'],
  buckets: [0.1, 0.5, 1, 3, 5],
});

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const end = httpRequestDurationHistogram.startTimer({
    method: req.method,
    path: req.route?.path || req.path,
  });

  res.on('finish', () => {
    const statusCode = res.statusCode.toString();
    httpRequestCounter.inc({ method: req.method, path: req.route?.path || req.path, status: statusCode });
    end({ status: statusCode });
  });

  next();
};
