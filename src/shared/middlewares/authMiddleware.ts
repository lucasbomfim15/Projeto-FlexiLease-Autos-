import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AppError from '@shared/errors/AppError';

dotenv.config();

interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
     res.status(401).json({ error: 'Token não fornecido' });
     return
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret') as any;
    req.userId = decoded.id; // Assuming your token payload has an 'id' field
    next();
  } catch (err) {
     res.status(401).json({ error: 'Token inválido' });
     return;
  }
};

export default authMiddleware;
