'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('keys', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
       },
       user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
       },
       key: {
        type: Sequelize.INTEGER,
        allowNull: false,
       },
       type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'RPW'
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

    await queryInterface.dropTable('keys');

  }
};
