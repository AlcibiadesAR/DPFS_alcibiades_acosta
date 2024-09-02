var express = require("express");
var router = express.Router();
const usersControllers = require("../Controllers/usersControllers");

// Ruta para el carrito de compras
router.get("/users/productCart", usersControllers.pageCart);

// Ruta para el registro
router.get("/users/register", usersControllers.pageRegister);

// Ruta para login
router.get("/users/login", usersControllers.pageLogin);

// Ruta para recuperar contraseña
router.get("/users/forgotPassword", usersControllers.pageForgotPassword);

// Ruta para nueva contraseña
router.get("/users/forgotNewPassword", usersControllers.pageForgotNewPassword);

module.exports = router;
