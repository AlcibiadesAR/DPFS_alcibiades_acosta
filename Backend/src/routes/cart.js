const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Agregar producto al carrito
router.post('/cart/add', authMiddleware.MiddlewareAuth, cartController.addProductToCart);

// Obtener carrito
router.get('/cart/pageCart', authMiddleware.MiddlewareAuth, cartController.getCart);

// Eliminar producto del carrito
router.delete('/cart/remove/:id', authMiddleware.MiddlewareAuth, cartController.removeProductFromCart);

router.post('/cart/vaciarCarrito',authMiddleware.MiddlewareAuth, cartController.vaciarCarrito);

module.exports = router;
