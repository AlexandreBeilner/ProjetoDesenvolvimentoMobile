'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
            name: { type: Sequelize.STRING(120), allowNull: false },
            email: { type: Sequelize.STRING(180), allowNull: false, unique: true },
            password_hash: { type: Sequelize.STRING(255), allowNull: false },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        });

        await queryInterface.addIndex('users', ['email'], {
            unique: true,
            name: 'users_email_unique'
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('users');
    }
};
