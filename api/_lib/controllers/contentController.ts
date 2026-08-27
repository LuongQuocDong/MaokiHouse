import type { Request, Response, NextFunction } from 'express';
import { ContentModel, isContentKey } from '../models/Content';

export const getContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params;
    if (!isContentKey(key)) return res.status(400).json({ error: 'Invalid content key' });
    const content = await ContentModel.get(key);
    res.json(content);
  } catch (error) {
    next(error);
  }
};

export const putContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params;
    if (!isContentKey(key)) return res.status(400).json({ error: 'Invalid content key' });

    const value = {
      ...req.body,
      updatedAt: Date.now(),
      updatedBy: req.user?.email || req.user?.uid,
    };

    await ContentModel.set(key, value);
    res.json(value);
  } catch (error) {
    next(error);
  }
};
