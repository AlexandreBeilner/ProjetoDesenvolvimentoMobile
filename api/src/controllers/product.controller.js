import { Product, User } from '../models/index.js';

/**
 * POST /api/products
 * { title, description?, price, imageUri?, userId }
 */
export async function createProduct(req, res, next) {
    try {
        const { title, description, price, image, userId } = req.body;
        if (!title || userId == null) return res.status(400).json({ error: 'Titulo é obrigatório' });

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        if (price === undefined || price === null || isNaN(Number(price))) {
            return res.status(400).json({ error: 'O preço é invalido' });
        }

        const product = await Product.create({
            title,
            description: description ?? null,
            price: Number(price),
            image: image ?? null,
            userId,
        });

        res.status(201).json(product);
    } catch (e) {
        next(e);
    }
}

export async function getProductsToList(req, res) {
    const [rows] = await Product.sequelize.query(
        `
        SELECT products.*, u.id as userId, u.title as userTitle
        FROM products
        LEFT JOIN users u ON products.user_id = u.id
        ORDER BY products.id DESC
        `
    )

    const response = rows.reduce((previousValue, currentValue) => {
        if (!previousValue[currentValue.user_id]) {
            previousValue[currentValue.user_id] = {
                title: currentValue.usertitle,
                products: []
            }
        }

        previousValue[currentValue.user_id].products = [
            ...previousValue[currentValue.user_id].products,
            currentValue
        ];

        return previousValue;
    }, {});

    return res.json(response);
}

/** GET /api/products?userId=&page=&limit= */
export async function listProducts(req, res, next) {
    try {
        const { userId, page = 1, limit = 20 } = req.query;
        const where = {};
        if (userId) where.userId = Number(userId);

        const { rows, count } = await Product.findAndCountAll({
            where,
            order: [['id', 'DESC']],
            offset: (Number(page) - 1) * Number(limit),
            limit: Number(limit),
        });

        res.json({ items: rows, total: count, page: Number(page), limit: Number(limit) });
    } catch (e) {
        next(e);
    }
}

/** GET /api/products/:id */
export async function getProduct(req, res, next) {
    try {
        const item = await Product.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'not_found' });
        res.json(item);
    } catch (e) {
        next(e);
    }
}

/** GET /api/users/:userId/products */
export async function listProductsByUser(req, res, next) {
    req.query.userId = req.params.userId;
    return listProducts(req, res, next);
}

export async function updateProduct(req, res, next) {
    try {
        const { title, description, price, image, id } = req.body;
        if (!title) return res.status(400).json({ error: 'Titulo é obrigatório' });

        if (price === undefined || price === null || isNaN(Number(price))) {
            return res.status(400).json({ error: 'O preço é invalido' });
        }

        const product = await Product.findByPk(id);
        if (! product) return res.status(404).json({ error: 'Produto não encontrado' });

        await product.update({
            title,
            description: description ?? null,
            price: Number(price),
            image: image ?? null,
        })

        res.status(200).json(product);
    } catch (e) {
        next(e);
    }
}

export async function deleteProduct(req, res, next) {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (! product) return res.status(404).json({ error: 'Produto não encontrado' });

        await product.destroy();

        res.status(200).json(product);
    } catch (e) {
        next(e);
    }
}
