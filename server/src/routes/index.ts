import { Router } from 'express';
import homestaysRouter from './homestays';
import contentRouter from './content';
import uploadRouter from './upload';
import authRouter from './auth';

const router = Router();

router.use('/homestays', homestaysRouter);
router.use('/content', contentRouter);
router.use('/upload', uploadRouter);
router.use('/auth', authRouter);

export default router;
