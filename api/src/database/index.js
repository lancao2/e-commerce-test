const  Sequelize  = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User')
const Key = require('../app/models/Key')
const Category = require('../app/models/Category')
const Product = require('../app/models/Product')
const Image = require('../app/models/image')

const models = [User, Key, Category, Product, Image]

const sequelize = new Sequelize(dbConfig);

models.map(model => model.init(sequelize))

module.exports = sequelize;
