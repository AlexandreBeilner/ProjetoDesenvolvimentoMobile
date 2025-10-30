import { DataTypes } from 'sequelize';

export function initUserModel(sequelize) {
    const User = sequelize.define(
        'User',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING(120), allowNull: false },
            email: {
                type: DataTypes.STRING(180),
                allowNull: false,
                unique: true,
                validate: { isEmail: true }
            },
            passwordHash: {
                type: DataTypes.STRING(255),
                allowNull: false,
                field: 'password_hash'
            }
        },
        { tableName: 'users', underscored: true }
    );

    return User;
}
