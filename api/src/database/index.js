const  Sequelize  = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User')
const Key = require('../app/models/Key')

const models = [User, Key]

const sequelize = new Sequelize(dbConfig);

models.map(model => model.init(sequelize))

module.exports = sequelize;
