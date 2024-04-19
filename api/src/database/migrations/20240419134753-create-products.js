'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
       },
       name: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       descriptions: {
        type: Sequelize.TEXT,
        allowNull: false,
       },
       id_cateory: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
       },
       supply: {
        type: Sequelize.INTEGER,
        allowNull: false,
       },
       price: {
        type: Sequelize.FLOAT,
        allowNull: false,
       },
       created_at: {
        type: Sequelize.DATE,
        allowNull: false,
       },
       updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
       },
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('products');

  }
};
