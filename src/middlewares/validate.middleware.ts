import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateBody = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'error_validacion',
          errors: error.issues.map((issue) => ({
            campo:   issue.path[0],
            mensaje: issue.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
};