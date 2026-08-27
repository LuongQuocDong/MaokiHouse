import { Router } from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import { uploadImage } from '../controllers/uploadController';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const router = Router();

router.post('/', requireAuth, adminOnly, upload.single('file'), uploadImage);

export default router;
