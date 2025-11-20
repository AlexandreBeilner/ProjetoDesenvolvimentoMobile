'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            name: {type: Sequelize.STRING(120), allowNull: false},
            email: {type: Sequelize.STRING(180), allowNull: false, unique: true},
            password_hash: {type: Sequelize.STRING(255), allowNull: false},

            title: {type: Sequelize.STRING(140), allowNull: true},
            description: {type: Sequelize.TEXT, allowNull: true},
            rating: {type: Sequelize.DECIMAL(2, 1), allowNull: true},

            user_type: {
                type: Sequelize.ENUM,
                values: ['consumer', 'location'],
                allowNull: false,
                defaultValue: 'consumer',
            },

            image: {type: Sequelize.TEXT, allowNull: true},
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW'),
            },
        });

        await queryInterface.addIndex('users', ['user_type'], {
            name: 'users_user_type_idx',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex('users', 'users_user_type_idx');
        await queryInterface.dropTable('users');

        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_user_type";');
    },
};
