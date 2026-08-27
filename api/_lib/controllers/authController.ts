import type { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const decoded = await auth.verifyIdToken(token);
    res.json({
      uid: decoded.uid,
      email: decoded.email,
      admin: decoded.admin === true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
};
