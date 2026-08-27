import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import {
  listHomestays,
  getHomestay,
  createHomestay,
  updateHomestay,
  deleteHomestay,
} from '../controllers/homestayController';

const router = Router();

router.get('/', listHomestays);
router.get('/:id', getHomestay);
router.post('/', requireAuth, adminOnly, createHomestay);
router.put('/:id', requireAuth, adminOnly, updateHomestay);
router.delete('/:id', requireAuth, adminOnly, deleteHomestay);

export default router;
