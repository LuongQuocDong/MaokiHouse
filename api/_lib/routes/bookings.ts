import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import { bookingController } from '../controllers/bookingController';

const router = Router();

router.use(requireAuth, adminOnly);
router.get('/', bookingController.list);
router.get('/:id', bookingController.get);
router.post('/', bookingController.create);
router.put('/:id', bookingController.update);
router.delete('/:id', bookingController.remove);

export default router;
