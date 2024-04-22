const express = require('express');
const routes = express.Router();

const imageController = require("../controllers/imagesController")

routes.delete('/:url_id', imageController.delete)

module.exports = routes