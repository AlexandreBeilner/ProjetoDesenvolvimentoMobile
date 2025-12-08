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


/**
 * PUT /api/users/:id
 * Edita usuário
 */
export async function updateUser(req, res, next) {
    try {
        const { id } = req.params;

        const {
            name,
            email,
            password,
            userType,
            title,
            description,
            rating,
            image,
        } = req.body ?? {};

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Se e-mail foi enviado, verificar duplicidade
        if (email && email !== user.email) {
            const exists = await User.findOne({
                where: { email: email.toLowerCase() },
            });

            if (exists) {
                return res
                    .status(409)
                    .json({ error: 'Já existe um usuário com esse e-mail' });
            }

            user.email = email.toLowerCase();
        }

        if (password) {
            const passwordHash = crypto
                .createHash('sha256')
                .update(password)
                .digest('hex');

            user.passwordHash = passwordHash;
        }

        if (name) user.name = name;
        if (title !== undefined) user.title = title;
        if (description !== undefined) user.description = description;
        if (rating !== undefined) user.rating = rating;
        if (image !== undefined) user.image = image;

        if (userType && ['consumer', 'location'].includes(userType)) {
            user.userType = userType;
        }

        await user.save();

        res.json({
            message: 'Usuário atualizado com sucesso',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                title: user.title,
                description: user.description,
                rating: user.rating,
                image: user.image,
            },
        });
    } catch (err) {
        next(err);
    }
}


/**
 * DELETE /api/users/:id
 * Remove usuário definitivamente
 */
export async function deleteUser(req, res, next) {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        await user.destroy();

        res.json({ message: 'Usuário removido com sucesso' });
    } catch (err) {
        next(err);
    }
}
