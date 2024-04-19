const express = require('express');
const routes = express.Router();

const categoryController = require('../controllers/CategoryController');

routes.get('', categoryController.index)
routes.post('', categoryController.store)
routes.put('/:categoryId', categoryController.update)
routes.delete('/:categoryId', categoryController.delete)

module.exports = routes