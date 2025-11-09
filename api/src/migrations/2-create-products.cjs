'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            title: { type: Sequelize.STRING(140), allowNull: false },
            description: { type: Sequelize.TEXT, allowNull: true },
            price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
            image_url: { type: Sequelize.TEXT, allowNull: true },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
        });

        await queryInterface.addIndex('products', ['user_id'], { name: 'products_user_id_idx' });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('products');
    },
};
