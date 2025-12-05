import crypto from 'crypto';
import { User } from '../models/index.js';

export async function login(req, res, next) {
    try {
        const { email, password } = req.body ?? {};

        if (!email || !password) {
            return res.status(400).json({
                error: 'E-mail e senha são obrigatórios',
            });
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        const user = await User.findOne({
            where: { email: normalizedEmail },
        });

        if (!user) {
            return res.status(404).json({
                error: 'Conta não encontrada. Crie uma conta para continuar',
            });
        }

        const passwordHash = crypto
            .createHash('sha256')
            .update(String(password))
            .digest('hex');

        if (passwordHash !== user.passwordHash) {
            return res.status(401).json({
                error: 'E-mail ou senha inválidos',
            });
        }


        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            image: user.image,
            title: user.title,
            description: user.description
        });
    } catch (err) {
        next(err);
    }
}
