import type { NextFunction, Request, Response } from 'express';

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.admin) {
    return res.status(403).json({ error: 'Admin privileges required' });
  }
  next();
};
