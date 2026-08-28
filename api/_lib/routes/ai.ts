import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import { chat } from '../controllers/aiController';

const router = Router();

router.post('/chat', requireAuth, adminOnly, chat);

export default router;
