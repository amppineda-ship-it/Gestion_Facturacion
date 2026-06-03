import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('[ERROR]', err.message);
  res.status(500).json({
    status:  'error_interno',
    mensaje: 'Ocurrió un error interno en el servidor.',
  });
};