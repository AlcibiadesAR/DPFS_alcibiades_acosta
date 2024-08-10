var express = require('express');
var router = express.Router();
var path = require('path');

// Ruta para la página de inicio
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
