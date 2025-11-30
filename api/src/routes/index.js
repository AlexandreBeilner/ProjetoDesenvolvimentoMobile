import { Router } from 'express';
import usersRouter from './users.routes.js';
import productsRouter from './products.routes.js';
import authRouter from './auth.routes.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/auth', authRouter);

export default router;
