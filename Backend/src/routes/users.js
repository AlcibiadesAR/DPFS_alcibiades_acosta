let express = require("express");
let router = express.Router();
const usersControllers = require("../Controllers/usersControllers");
const authMiddlewareControllers = require("../middleware/authMiddleware");
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

// Rutas GET
router.get(
  "/users/productCart",
  authMiddlewareControllers.MiddlewareAuth, 
  usersControllers.pageCart
);

router.get("/users/register", usersControllers.pageRegister);

router.get("/users/login", usersControllers.pageLogin);

router.get("/users/forgotPassword", usersControllers.pageForgotPassword);

router.get("/users/forgotNewPassword", usersControllers.pageForgotNewPassword);

router.get(
  "/users/Account",
  authMiddlewareControllers.MiddlewareAuth,
  usersControllers.pageMyAccount
);

router.get('/users/logout', usersControllers.logout);

// Rutas POST
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

router.post(
  "/users/updateProfile",
  authMiddlewareControllers.MiddlewareAuth, 
  upload.single("profileImage"), 
  usersControllers.updateProfile
);



module.exports = router;
