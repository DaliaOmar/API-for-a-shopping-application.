import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Access denied' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, TOKEN_SECRET);

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({ error: 'Access denied' });
  }
};


export const signToken = (id: number, email: string) => {
  return jwt.sign({ id, email }, TOKEN_SECRET);
};