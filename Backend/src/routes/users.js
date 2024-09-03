var express = require("express");
var router = express.Router();
const usersControllers = require("../Controllers/usersControllers");
const authMiddlewareControllers = require("../Controllers/authMiddlewareControllers");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/images/users"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Ruta para el carrito de compras
router.get(
  "/users/productCart",
  authMiddlewareControllers.MiddlewareAuth,
  usersControllers.pageCart
);

// Ruta para el registro
router.get("/users/register", usersControllers.pageRegister);

// Ruta para login
router.get("/users/login", usersControllers.pageLogin);

// Ruta para recuperar contraseña
router.get("/users/forgotPassword", usersControllers.pageForgotPassword);

// Ruta para nueva contraseña
router.get("/users/forgotNewPassword", usersControllers.pageForgotNewPassword);

// Ruta para la cuenta del usuario
router.get(
  "/users/myAccount",
  authMiddlewareControllers.MiddlewareAuth,
  usersControllers.pageMyAccount
);

//Rutas POST
router.post(
  "/users/register",
  upload.single("avatar"),
  usersControllers.validacionesFormRegister,
  usersControllers.procesarFormRegister
);

router.post(
  "/users/login",
  usersControllers.validacionesFormLogin,
  usersControllers.procesarFormLogin
);

module.exports = router;
