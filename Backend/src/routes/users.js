var express = require("express");
var router = express.Router();
const usersControllers = require("../Controllers/usersControllers");

// Ruta para el carrito de compras
router.get("/productCart", usersControllers.pageCart);

// Ruta para el registro
router.get("/register", usersControllers.pageRegister);

// Ruta para login
router.get("/login", usersControllers.pageLogin);

// Ruta para recuperar contraseña
router.get("/forgot-password", usersControllers.pageForgotPassword);

// Ruta para nueva contraseña
router.get("/forgot-new-password", usersControllers.pageForgotNewPassword);

module.exports = router;
