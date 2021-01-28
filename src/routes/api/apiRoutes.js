import express from 'express';
import userRoutes from './users/userRoutes';
import roleRoutes from './roles/roleRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/roles', roleRoutes);

export default router;
