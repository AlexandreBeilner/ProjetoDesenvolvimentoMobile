import { sequelize } from '../db.js';
import { initUserModel } from './user.model.js';

export const User = initUserModel(sequelize);

// Caso tenha associações no futuro:
// User.associate?.({ ...outrosModels });

export { sequelize };
