const express = require("express");
const router = express.Router();
const admiController = require("../Controllers/admiController");
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
router.get("/admi/administrar", admiController.pageAdministrar);

// Ruta para la página de creación del producto
router.get("/admi/create", admiController.pageCreate);

// Ruta para la página de edición del producto
router.get("/admi/edit/:id", admiController.pageEditing);

//Post rutas
// Ruta para enviar formulario de creacion de productos
router.post("/admi", upload.single('image'), admiController.createProduct);

// PUT ruta para actualizar un producto
router.put("/admi/edit/:id", upload.single('image'), admiController.updateProduct);


// Delete ruta para eliminar un producto
router.delete("/admi/delete/:id", admiController.deleteProduct);

module.exports = router;
