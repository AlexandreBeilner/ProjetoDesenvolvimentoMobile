import crypto from 'crypto';
import { User } from '../models/index.js';

/**
 * GET /api/users
 * Lista usuários (pode filtrar por tipo: ?userType=location)
 */
export async function listUsers(req, res, next) {
    try {
        const { userType } = req.query;

        const where = {};
        if (userType) {
            where.userType = userType;
        }

        const users = await User.findAll({
            where,
            attributes: [
                'id',
                'name',
                'email',
                'userType',
                'title',
                'description',
                'rating',
                'image',
                'createdAt',
            ],
            order: [
                ['rating', 'DESC'],
                ['id', 'DESC'],
            ],
        });

        res.json(users);
    } catch (err) {
        next(err);
    }
}

/**
 * POST /api/users
 * Cria um usuário (consumer OU location)
 * Regra pedida:
 *  - só cria se ainda NÃO existir email
 */
export async function createUser(req, res, next) {
    try {
        const {
            name,
            email,
            password,
            userType = 'consumer',
            title,
            description,
            rating,
            image,
        } = req.body ?? {};

        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'Nome, email e senha são obrigatórios',
            });
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        const validUserType = ['consumer', 'location'].includes(userType)
            ? userType
            : 'consumer';

        if (validUserType === 'location' && !title) {
            return res.status(400).json({
                error: 'Título é obrigatório para estabelecimentos',
            });
        }

        const existing = await User.findOne({
            where: { email: normalizedEmail },
        });

        if (existing) {
            return res.status(409).json({
                error: 'Já existe uma conta com este e-mail',
            });
        }

        const passwordHash = crypto
            .createHash('sha256')
            .update(String(password))
            .digest('hex');


        const user = await User.create({
            name,
            email: normalizedEmail,
            passwordHash,
            userType: validUserType,
            title: title ?? null,
            description: description ?? null,
            rating: rating ?? null,
            image: image ?? null,
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
        });
    } catch (err) {
        next(err);
    }
}
