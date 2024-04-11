const express = require('express');
const routes = express.Router();

const userController = require("../controllers/UserController")
const authMiddleware = require("../middleware/auth")

routes.post('', userController.store)
routes.post('/edit', authMiddleware ,userController.update)

module.exports = routes