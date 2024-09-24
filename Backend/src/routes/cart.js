const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/cart/add', authMiddleware.MiddlewareAuth, cartController.addProductToCart);

router.get('/cart/pageCart', authMiddleware.MiddlewareAuth, cartController.getCart);

router.delete('/cart/remove/:id', authMiddleware.MiddlewareAuth, cartController.removeProductFromCart);

router.post('/cart/vaciarCarrito', authMiddleware.MiddlewareAuth, cartController.vaciarCarrito);

router.get('/cart/count', authMiddleware.MiddlewareAuth, cartController.getCartCount);

module.exports = router; 