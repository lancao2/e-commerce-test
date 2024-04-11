const  Sequelize  = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User')

const models = [User]

const sequelize = new Sequelize(dbConfig);

models.map(model => model.init(sequelize))

module.exports = sequelize;
