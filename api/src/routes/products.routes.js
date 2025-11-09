import { Router } from 'express';
import { createProduct, listProducts, getProduct, listProductsByUser } from '../controllers/product.controller.js';

const router = Router();
router.post('/', createProduct);
router.get('/', listProducts);
router.get('/:id', getProduct);
router.get('/user/:userId/list', listProductsByUser);

export default router;
