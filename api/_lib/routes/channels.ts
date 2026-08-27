import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import { listChannels, connectChannel, disconnectChannel } from '../controllers/channelController';

const router = Router();

router.use(requireAuth, adminOnly);
router.get('/', listChannels);
router.post('/:platform/connect', connectChannel);
router.post('/:platform/disconnect', disconnectChannel);

export default router;
