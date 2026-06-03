import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  id:    number;
  email: string;
  role:  string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ mensaje: 'No se proporcionó token.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env['JWT_SECRET'] || 'mi_clave_secreta_super_segura_2024';
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ mensaje: 'No tienes permisos para esta acción.' });
      return;
    }
    next();
  };
};