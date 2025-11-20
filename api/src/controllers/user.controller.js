import crypto from 'crypto';
import { User } from '../models/index.js';

/**
 * GET /api/users?userType=
 * Lista apenas usuários do tipo 'location'
 */
export async function listUsers(req, res, next) {
  try {
    console.log('Fetching location users only');
    const users = await User.findAll({ 
      attributes: ['id', 'name', 'email', 'userType', 'title', 'description', 'rating', 'imageUrl', 'createdAt'],
      order: [['rating', 'DESC NULLS LAST'], ['id', 'DESC']]
    });
    
    res.json(users);
  } catch (e) {
    next(e);
  }
}

/**
 * POST /api/users
 * { name, email, password, userType?, title?, description?, rating?, image? }
 */
export async function createUser(req, res, next) {
  try {
    const { name, email, password, userType, title, description, rating, image } = req.body ?? {};
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatorios, verifique os dados e tente novamente' });
    }

    const validUserType = ['consumer', 'location'].includes(userType) ? userType : 'consumer';
    

    if (validUserType === 'location' && !title) {
      return res.status(400).json({ error: 'Titulo é obrigatorio para localizações' });
    }

    const passwordHash = crypto.createHash('sha256').update(String(password)).digest('hex');
    
    const user = await User.create({ 
      name, 
      email, 
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
      userType: user.userType
    });
  } catch (e) {
    next(e);
  }
}