const express = require('express');
const routes = express.Router();

const userController = require("../controllers/UserController")

routes.post('', userController.store)
routes.post('/:id', userController.update)

module.exports = routes