import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import { revenueController } from '../controllers/revenueController';

const router = Router();

router.use(requireAuth, adminOnly);
router.get('/', revenueController.list);
router.get('/:id', revenueController.get);
router.post('/', revenueController.create);
router.put('/:id', revenueController.update);
router.delete('/:id', revenueController.remove);

export default router;
