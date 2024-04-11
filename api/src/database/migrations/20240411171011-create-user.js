'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('users', {
       id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
       },
       name:{
        type: Sequelize.STRING,
        allowNull: false,
       },
       email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
       },
       password: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       is_adm: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    await queryInterface.dropTable('users');

  }
};
