import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authRequest';

export const signToken = (id: number, email: string) => {
  return jwt.sign(
    { id, email },
    process.env.TOKEN_SECRET as string
  );
};

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json('Access denied');
    }

    const token = header.split(' ')[1];

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    req.user = decoded as { id: number };

    next();
  } catch {
    res.status(401).json('Invalid token');
  }
};