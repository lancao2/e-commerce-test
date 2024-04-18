const express = require('express');
const routes = express.Router();

const authController = require('../controllers/authController');
const adminMiddleware = require("../middleware/admin")

routes.post('', authController.store)
routes.post('/admin',adminMiddleware, authController.store)

module.exports = routes
