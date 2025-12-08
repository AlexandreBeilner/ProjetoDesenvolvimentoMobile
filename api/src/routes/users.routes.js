import { Router } from 'express';
import { listUsers, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = Router();

router.get('/', listUsers);
router.post('/', createUser);
router.put('/:id', updateUser);    // ✔ editar
router.delete('/:id', deleteUser); // ✔ deletar

export default router;
