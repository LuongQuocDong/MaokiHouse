import type { Request, Response, NextFunction } from 'express';
import { generateGeminiReply } from '../config/gemini';
import type { GeminiChatMessage } from '../config/gemini';

export async function chat(req: Request, res: Response, next: NextFunction) {
  try {
    const { history } = req.body as { history?: GeminiChatMessage[] };

    if (!Array.isArray(history) || history.length === 0) {
      return res.status(400).json({ error: 'history must be a non-empty array' });
    }

    const reply = await generateGeminiReply(history);
    res.json({ reply });
  } catch (error) {
    next(error);
  }
}
