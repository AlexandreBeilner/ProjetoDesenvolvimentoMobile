'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_locations', {
    id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING(120), allowNull: false },
    email: { type: Sequelize.STRING(180), allowNull: false, unique: true },
    password_hash: { type: Sequelize.STRING(255), allowNull: false },
    title: {type: Sequelize.STRING(140),allowNull: true,},
    description: {type: Sequelize.TEXT,allowNull: true,},
    rating: {type: Sequelize.DECIMAL(2, 1),allowNull: true,},
    image_url: {type: Sequelize.TEXT,allowNull: true,},
    created_at: {type: Sequelize.DATE,  allowNull: false,  defaultValue: Sequelize.fn('NOW'),},
    updated_at: {type: Sequelize.DATE,allowNull: false,defaultValue: Sequelize.fn('NOW'),},
    user_id: {type: Sequelize.INTEGER,allowNull: false,references: { model: 'users', key: 'id' },onUpdate: 'CASCADE',onDelete: 'CASCADE',},
    user_type: {type: Sequelize.ENUM('consumer', 'location'),allowNull: false,defaultValue: 'consumer',},
    });

    await queryInterface.addIndex('user_locations', ['user_id'], {
      name: 'user_locations_user_id_idx',
    });

    await queryInterface.addIndex('user_locations', ['user_type'], {
      name: 'user_locations_user_type_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_locations');
  },
};
