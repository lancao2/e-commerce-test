const express = require('express');
const routes = express.Router();

const authController = require('../controllers/authController');

routes.post('', authController.store)

module.exports = routes