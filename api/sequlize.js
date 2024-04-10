require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.NM_DB, process.env.USER_DB, process.env.PW_DB, {
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
  dialect: process.env.DB
});

module.exports = sequelize;