import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import { messageController } from '../controllers/messageController';

const router = Router();

router.use(requireAuth, adminOnly);
router.get('/', messageController.list);
router.get('/:id', messageController.get);
router.post('/', messageController.create);
router.put('/:id', messageController.update);
router.delete('/:id', messageController.remove);
router.post('/:id/messages', messageController.appendMessage);

export default router;
