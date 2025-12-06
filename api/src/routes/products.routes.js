import { Router } from 'express';
import {
    createProduct,
    listProducts,
    getProduct,
    listProductsByUser,
    getProductsToList,
    deleteProduct, updateProduct
} from '../controllers/product.controller.js';

const router = Router();
router.post('/', createProduct);
router.get('/', getProductsToList);
router.get('/:id', getProduct);
router.get('/user/:userId/list', listProductsByUser);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
