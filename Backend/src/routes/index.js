const express = require("express");
const router = express.Router();
const indexController = require("../Controllers/indexController");

// Ruta para la página de inicio
router.get("/", indexController.pageHome);

module.exports = router;
