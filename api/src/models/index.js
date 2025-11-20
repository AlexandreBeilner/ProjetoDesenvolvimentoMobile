import { sequelize } from '../db.js';
import { initUserModel } from './user.model.js';
import { initProductModel } from './product.model.js';

export const User = initUserModel(sequelize);
export const Product = initProductModel(sequelize);

Product.belongsTo(User, { foreignKey: 'id', as: 'user' });
User.hasMany(Product, { foreignKey: 'user_id', as: 'products' });

export { sequelize };
