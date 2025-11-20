import {DataTypes} from 'sequelize';

export function initUserModel(sequelize) {
    const User = sequelize.define(
        'User',
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            name: {type: DataTypes.STRING(120), allowNull: false},
            email: {
                type: DataTypes.STRING(180),
                allowNull: false,
                unique: true,
                validate: {isEmail: true},
            },
            passwordHash: {
                type: DataTypes.STRING(255),
                allowNull: false,
                field: 'password_hash',
            },

            userType: {
                type: DataTypes.ENUM('consumer', 'location'),
                allowNull: false,
                defaultValue: 'consumer',
                field: 'user_type',
            },

            title: {type: DataTypes.STRING(140), allowNull: true},
            description: {type: DataTypes.TEXT, allowNull: true},
            rating: {type: DataTypes.DECIMAL(2, 1), allowNull: true},

            image: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'image',
            },
        },
        {
            tableName: 'users',
            underscored: true,
        },
    );

    return User;
}
