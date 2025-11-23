import crypto from 'crypto';
import { User } from '../models/index.js';

/**
 * GET /api/users
 * Lista usuários (pode filtrar por tipo: ?userType=location)
 */
export async function listUsers(req, res, next) {
  try {
    const { userType } = req.query;

    console.log("➡️ [GET] /api/users — filtro:", userType ?? "none");

    const where = {};
    if (userType) where.userType = userType;

    const users = await User.findAll({
      where,
      attributes: [
        'id', 'name', 'email', 'userType',
        'title', 'description', 'rating', 
        'image', 'createdAt'
      ],
      order: [
        ['rating', 'DESC NULLS LAST'],
        ['id', 'DESC']
      ]
    });

    res.json(users);

  } catch (err) {
    console.log("🔥 ERRO listUsers:", err);
    next(err);
  }
}

/**
 * POST /api/users
 * Cria um usuário (consumer OU location)
 */
export async function createUser(req, res, next) {
  try {
    console.log("➡️ [POST] /api/users — requisição recebida");
    console.log("📦 Corpo recebido:", req.body);

    const {
      name,
      email,
      password,
      userType = "consumer",
      title,
      description,
      rating,
      image
    } = req.body ?? {};

    // 🔍 Validação básica
    if (!name || !email || !password) {
      console.log("❌ Falha: faltando nome/email/senha");
      return res.status(400).json({
        error: "Nome, email e senha são obrigatorios"
      });
    }

    // 🔍 Garantir tipo válido
    const validUserType = 
      ["consumer", "location"].includes(userType)
        ? userType
        : "consumer";

    // 🔍 Se for estabelecimento: título é obrigatório
    if (validUserType === "location" && !title) {
      console.log("❌ Falha: título obrigatório para location");
      return res.status(400).json({
        error: "Título é obrigatório para estabelecimentos"
      });
    }

    // 🔐 Hash da senha
    const passwordHash = crypto
      .createHash("sha256")
      .update(String(password))
      .digest("hex");

    console.log("🔐 Hash gerado:", passwordHash);

    // 🧱 Criar usuário no DB
    const user = await User.create({
      name,
      email,
      passwordHash,
      userType: validUserType,
      title: title ?? null,
      description: description ?? null,
      rating: rating ?? null,
      image: image ?? null
    });

    console.log("✅ Usuário criado:", {
      id: user.id,
      email: user.email,
      tipo: user.userType
    });

    // 🔥 Retorno seguro
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType
    });

  } catch (err) {
    console.log("🔥 ERRO createUser:", err);
    next(err);
  }
}
