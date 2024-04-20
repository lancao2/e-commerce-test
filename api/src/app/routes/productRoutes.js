const express = require('express');
const routes = express.Router();
const multer = require('multer');

const productController = require('../controllers/productController');
const uploadImage = require('../service/firebase');

const upload = multer({
    dest: 'uploads',
    storage: multer.memoryStorage(),
    limits: 1024 * 1024
})

routes.post('', upload.array('images', 5), uploadImage, productController.srtore)
routes.get('', productController.index)
routes.put('/:id', productController.update)
routes.delete('/:id', productController.delete)

module.exports = routes