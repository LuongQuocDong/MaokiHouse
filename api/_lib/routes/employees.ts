import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import { employeeController } from '../controllers/employeeController';

const router = Router();

router.use(requireAuth, adminOnly);
router.get('/', employeeController.list);
router.get('/:id', employeeController.get);
router.post('/', employeeController.create);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.remove);

export default router;
