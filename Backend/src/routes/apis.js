const express = require('express');
const router = express.Router();
const apisControllers = require('../Controllers/apisController');

// Rutas de API para productos
router.get('/api/products', apisControllers.apiProductsList);
router.get('/api/products/:id', apisControllers.apiProductDetails);
router.get('/api/lastProduct', apisControllers.apiLastProduct);

// Rutas de API para usuarios
router.get('/api/users', apisControllers.apiUsersList);
router.get('/api/users/:id', apisControllers.apiUserDetails);


module.exports = router;
