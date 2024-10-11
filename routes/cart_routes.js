const express = require('express');

const cartController = require('../controllers/cart_controllers');

const router = express.Router();

router.get('/', cartController.getCart);

router.post('/items', cartController.cartCounter);

router.patch('/items', cartController.updateCartItem);


module.exports = router;