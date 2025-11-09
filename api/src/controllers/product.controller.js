import { Product, User } from '../models/index.js';

function parsePrice(v) {
    if (typeof v === 'number') return v;
    if (typeof v === 'string') {
        const norm = v.replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}\b)/g, '').replace(',', '.');
        return Number(norm);
    }
    return NaN;
}

/**
 * POST /api/products
 * { title, description?, price, imageUri?, userId }
 */
export async function createProduct(req, res, next) {
    try {
        const { title, description, price, imageUri, userId } = req.body;
        if (!title || userId == null) return res.status(400).json({ error: 'title and userId are required' });

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'user not found' });

        const priceNumber = parsePrice(price);
        if (Number.isNaN(priceNumber)) return res.status(400).json({ error: 'invalid price' });

        const product = await Product.create({
            title,
            description: description ?? null,
            price: priceNumber,
            imageUrl: imageUri ?? null,
            userId,
        });

        res.status(201).json(product);
    } catch (e) {
        next(e);
    }
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
