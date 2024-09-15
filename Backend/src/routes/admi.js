const express = require("express");
const router = express.Router();
const admiController = require("../Controllers/admiController");
const authMiddlewareControllers = require("../middleware/authMiddleware");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/images/productos"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//get rutas
// Ruta para la página principal de administración de los productos
router.get("/admi/administrar", authMiddlewareControllers.MiddlewareAuth, admiController.pageAdministrar);

// Ruta para buscar productos
router.get("/admi/search", authMiddlewareControllers.MiddlewareAuth, admiController.searchProducts);

// Ruta para la página de creación del producto
router.get("/admi/create", authMiddlewareControllers.MiddlewareAuth, admiController.pageCreate);

// Ruta para la página de edición del producto
router.get("/admi/edit/:id", authMiddlewareControllers.MiddlewareAuth, admiController.pageEditing);

//Post rutas
// Ruta para enviar formulario de creacion de productos
router.post("/admi/admiProducts", upload.single("image"), authMiddlewareControllers.MiddlewareAuth, admiController.createProduct);

// PUT ruta para actualizar un producto
router.put(
  "/admi/edit/:id",
  upload.single("image"),
  authMiddlewareControllers.MiddlewareAuth,
  admiController.updateProduct
);

// Delete ruta para eliminar un producto
router.delete("/admi/delete/:id", authMiddlewareControllers.MiddlewareAuth, admiController.deleteProduct);

module.exports = router;
