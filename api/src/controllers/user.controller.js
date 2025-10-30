import crypto from 'crypto';
import { User } from '../models/index.js';

export async function listUsers(_req, res, next) {
    try {
        console.log('Fetching all users');
        const users = await User.findAll({ attributes: ['id', 'name', 'email', 'createdAt'] });
        res.json(users);
    } catch (e) {
        next(e);
    }
}

export async function createUser(req, res, next) {
    try {
        const { name, email, password } = req.body;

        // Demonstração: em produção use bcrypt/argon2 com salt
        const passwordHash = crypto.createHash('sha256').update(String(password)).digest('hex');

        const user = await User.create({ name, email, passwordHash });
        res.status(201).json({ id: user.id });
    } catch (e) {
        next(e);
    }
}
