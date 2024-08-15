const express = require("express");
const router = express.Router();
const productsController = require("../Controllers/productsController");

// Ruta para la página de detalles del producto
router.get("/productDetail", productsController.pageDetails);

// Ruta para la página de creación del producto
router.get("/creacion", productsController.creacion);

// Ruta para la página de edición del producto
router.get("/edicion", productsController.edicion);

module.exports = router;