import { DataTypes } from 'sequelize';

export function initProductModel(sequelize) {
    const Product = sequelize.define(
        'Product',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            title: { type: DataTypes.STRING(140), allowNull: false },
            description: { type: DataTypes.TEXT, allowNull: true },
            price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            image: { type: DataTypes.TEXT('long'), allowNull: true, field: 'image' },
            userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
        },
        { tableName: 'products', underscored: true }
    );

    return Product;
}
