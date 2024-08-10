var express = require('express');
var router = express.Router();
var path = require('path');

// Ruta para los productos
router.get('/productDetail', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/productDetail.html'));
});

module.exports = router;
