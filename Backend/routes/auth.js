var express = require('express');
var router = express.Router();
var path = require('path');

// Ruta para el registro
router.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/register.html'));
});

// Ruta para login
router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Ruta para recuperar contraseña
router.get('/forgot-password', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/forgot-password.html'));
});

// Ruta para nueva contraseña
router.get('/forgot-new-password', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/forgot-new-password.html'));
});

module.exports = router;