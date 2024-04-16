const express = require('express');
const routes = express.Router();

const keyController = require('../controllers/keyController');

routes.post('', keyController.store)
routes.post('/code', keyController.update)

module.exports = routes