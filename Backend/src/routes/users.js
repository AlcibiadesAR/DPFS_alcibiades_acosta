let express = require("express");
let router = express.Router();
const usersControllers = require("../Controllers/usersControllers");
const authMiddlewareControllers = require("../middleware/authMiddleware");
const upload = require('../middleware/userImage')
const { validacionesFormLogin, validacionesFormRegister, validacionesFormRecuperacionPassword, validacionesFormResetPassword } = require("../middleware/userValidations");

// Rutas GET
router.get("/users/register", usersControllers.pageRegister);

router.get("/users/login", usersControllers.pageLogin);

router.get('/users/forgotPassword', usersControllers.pageForgotPassword);

router.get('/users/resetPassword', usersControllers.pageResetPassword);

router.get(
  "/users/Account",
  authMiddlewareControllers.MiddlewareAuth,
  usersControllers.pageMyAccount
);

router.get("/users/logout", usersControllers.logout);

// Rutas POST
router.post(
  "/users/register",
  upload.single("avatar"),
  validacionesFormRegister,
  usersControllers.procesarFormRegister
);

router.post(
  "/users/login",
  validacionesFormLogin,
  usersControllers.procesarFormLogin
);

router.post(
  "/users/updateProfile",
  authMiddlewareControllers.MiddlewareAuth,
  upload.single("profileImage"),
  usersControllers.updateProfile
);

//POST
router.post('/users/forgotPassword', validacionesFormRecuperacionPassword, usersControllers.processForgotPassword);

router.post('/users/resetPassword', validacionesFormResetPassword, usersControllers.processResetPassword);



module.exports = router;
