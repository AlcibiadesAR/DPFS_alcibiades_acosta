const express = require("express");
const router = express.Router();
const productsController = require("../Controllers/productsController");
const authMiddlewareControllers = require("../middleware/authMiddleware");

//get rutas
// Ruta para la página del catálogo de los relojes
router.get("/products", productsController.pageProducts);

// Ruta para la página de relojes por ofertas
router.get("/products/offers", productsController.pageOffer);

// Ruta para la página de relojes por marcas
router.get('/products/brands/:brand', productsController.pageBrand);

// Ruta para la página de relojes por categorías
router.get(
  "/products/category/:category",
  authMiddlewareControllers.MiddlewareAuth,
  productsController.pageCategory
);

// Ruta para la página de detalles del producto
router.get(
  "/products/:id",
  authMiddlewareControllers.MiddlewareAuth,
  productsController.pageDetails
);

module.exports = router;
