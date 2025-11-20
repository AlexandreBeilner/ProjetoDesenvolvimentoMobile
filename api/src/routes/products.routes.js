import { Router } from 'express';
import {
    createProduct,
    listProducts,
    getProduct,
    listProductsByUser,
    getProductsToList
} from '../controllers/product.controller.js';

const router = Router();
router.post('/', createProduct);
router.get('/', getProductsToList);
router.get('/:id', getProduct);
router.get('/user/:userId/list', listProductsByUser);

export default router;
