import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import { getContent, putContent } from '../controllers/contentController';

const router = Router();

router.get('/:key', getContent);
router.put('/:key', requireAuth, adminOnly, putContent);

export default router;
