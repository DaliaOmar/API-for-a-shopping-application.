import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    firstname?: string;
    lastname?: string;
  };
}