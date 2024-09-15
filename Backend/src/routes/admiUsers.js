const express = require("express");
const router = express.Router();
const usersAdmiControllers = require("../Controllers/usersAdmiController");
const authMiddlewareControllers = require("../middleware/authMiddleware");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/images/users"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname).toLowerCase());
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("El archivo debe ser una imagen en formato JPG, JPEG, PNG o GIF."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;


// Ruta para la página de administración de los usuarios
router.get(
  "/admiUsers/administrarUsers",
  authMiddlewareControllers.MiddlewareAuth,
  usersAdmiControllers.pageAdmiUsers
);

router.get("/admiUsers/searchUsers", authMiddlewareControllers.MiddlewareAuth, usersAdmiControllers.searchUsers);

// Ruta para crear usuario
router.get(
  "/admiUsers/createUsers",
  authMiddlewareControllers.MiddlewareAuth,
  usersAdmiControllers.createUsers
);

// Ruta para editar usuario
router.get(
  "/admiUsers/editUsers/:id",
  authMiddlewareControllers.MiddlewareAuth,
  usersAdmiControllers.pageUserEdit
);

// Ruta para ver el detalle del usuario
router.get(
  "/admiUsers/detailsUsers/:id",
  usersAdmiControllers.pageUserDetails
);

// Ruta para actualizar usuario
router.post(
  "/admiUsers/editUsers/:id",
  authMiddlewareControllers.MiddlewareAuth,
  usersAdmiControllers.updateProfileAdmi
);

// Ruta para crear usuario
router.post(
  "/admiUsers/createUsers",
  upload.single("avatar"),
  usersAdmiControllers.createUsersAdmi
);

module.exports = router;
