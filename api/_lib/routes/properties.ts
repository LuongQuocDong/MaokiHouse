import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import { propertyController } from '../controllers/propertyController';

const router = Router();

router.use(requireAuth, adminOnly);
router.get('/', propertyController.list);
router.get('/:id', propertyController.get);
router.post('/', propertyController.create);
router.put('/:id', propertyController.update);
router.delete('/:id', propertyController.remove);

export default router;
