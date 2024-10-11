const express = require('express');

const productController = require('../controllers/product_controllers');
// const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProductById);


module.exports = router;