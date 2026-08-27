import type { Request, Response, NextFunction } from 'express';
import { HomestayModel } from '../models/Homestay';

export const listHomestays = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const homestays = await HomestayModel.list();
    res.json(homestays);
  } catch (error) {
    next(error);
  }
};

export const getHomestay = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const homestay = await HomestayModel.get(req.params.id);
    if (!homestay) return res.status(404).json({ error: 'Homestay not found' });
    res.json(homestay);
  } catch (error) {
    next(error);
  }
};

export const createHomestay = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body || {};
    const data = {
      title: String(body.title || '').trim(),
      description: String(body.description || '').trim(),
      price: Number(body.price) || 0,
      airbnbLink: String(body.airbnbLink || '').trim(),
      phone: String(body.phone || '').trim(),
      imageURLs: Array.isArray(body.imageURLs) ? body.imageURLs : [],
      mainImageURL: body.mainImageURL || (Array.isArray(body.imageURLs) ? body.imageURLs[0] : '') || '',
      timestamp: Date.now(),
      updatedAt: Date.now(),
      updatedBy: req.user?.email || req.user?.uid,
    };
    const homestay = await HomestayModel.create(data);
    res.status(201).json(homestay);
  } catch (error) {
    next(error);
  }
};

export const updateHomestay = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existing = await HomestayModel.get(id);
    if (!existing) return res.status(404).json({ error: 'Homestay not found' });

    const body = req.body || {};
    const data: Record<string, unknown> = {
      updatedAt: Date.now(),
      updatedBy: req.user?.email || req.user?.uid,
    };

    if (body.title !== undefined) data.title = String(body.title).trim();
    if (body.description !== undefined) data.description = String(body.description).trim();
    if (body.price !== undefined) data.price = Number(body.price);
    if (body.airbnbLink !== undefined) data.airbnbLink = String(body.airbnbLink).trim();
    if (body.phone !== undefined) data.phone = String(body.phone).trim();
    if (Array.isArray(body.imageURLs) && body.imageURLs.length > 0) {
      data.imageURLs = body.imageURLs;
      data.mainImageURL = body.mainImageURL || body.imageURLs[0];
    }

    await HomestayModel.update(id, data);
    const updated = await HomestayModel.get(id);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteHomestay = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const existing = await HomestayModel.get(id);
    if (!existing) return res.status(404).json({ error: 'Homestay not found' });
    await HomestayModel.remove(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
