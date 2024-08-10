var express = require('express');
var router = express.Router();
var path = require('path');

// Ruta para el carrito de compras
router.get('/productCart', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/productCart.html'));
});

module.exports = router;
