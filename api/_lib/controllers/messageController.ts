import type { Request, Response, NextFunction } from 'express';
import { MessageThreadModel } from '../models/MessageThread';
import type { MessageThread } from '../models/MessageThread';
import { createCrudController } from './crudControllerFactory';

const PLATFORMS = ['airbnb', 'booking', 'agoda', 'direct'];

const base = createCrudController<MessageThread>(MessageThreadModel, {
  notFoundMessage: 'Message thread not found',
  sanitizeCreate: (body) => ({
    guestName: String(body.guestName || '').trim(),
    platform: PLATFORMS.includes(String(body.platform)) ? (body.platform as MessageThread['platform']) : 'direct',
    messages: [],
    lastMessageAt: Date.now(),
  }),
  sanitizeUpdate: (body) => {
    const data: Partial<MessageThread> = {};
    if (body.guestName !== undefined) data.guestName = String(body.guestName).trim();
    if (body.platform !== undefined && PLATFORMS.includes(String(body.platform))) {
      data.platform = body.platform as MessageThread['platform'];
    }
    return data;
  },
});

export const messageController = {
  ...base,
  appendMessage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hostId = req.user!.uid;
      const { id } = req.params;
      const thread = await MessageThreadModel.get(hostId, id);
      if (!thread) return res.status(404).json({ error: 'Message thread not found' });

      const text = String(req.body?.text || '').trim();
      if (!text) return res.status(400).json({ error: 'Message text is required' });

      const now = Date.now();
      const messages = [...thread.messages, { sender: 'host' as const, text, timestamp: now }];
      await MessageThreadModel.update(hostId, id, { messages, lastMessageAt: now });
      const updated = await MessageThreadModel.get(hostId, id);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  },
};
