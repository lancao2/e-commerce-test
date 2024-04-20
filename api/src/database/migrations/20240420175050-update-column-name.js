'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('products', 'id_cateory', 'id_category')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('products', 'id_category', 'id_cateory')
  }
};
