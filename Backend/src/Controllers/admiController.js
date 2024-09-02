const path = require("path");
const fs = require("fs");

const Administrar = {
  pageAdministrar: (req, res) => {
    const productos = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../data/products.json"))
    );

    res.render("admi/administrar", {
      title: "Administrar",
      list: productos,
    });
  },

  pageCreate: (req, res) => {
    res.render("admi/create", {
      title: "Creación de productos",
    });
  },

  createProduct: (req, res) => {
    const reloj = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../data/products.json"))
    );

    let ultimoReloj = reloj.pop();
    reloj.push(ultimoReloj);

    // Datos del producto
    const newProduct = {
      Id: ultimoReloj.Id + 1,
      Name: req.body.name,
      Description: req.body.description,
      Category: req.body.category,
      Image: `/images/productos/${req.file.filename}`,
      Colors: req.body.colors,
      Price: parseFloat(req.body.price),
      Brand: req.body.brand,
      Model: req.body.model,
      Box: req.body.box,
      Band: req.body.band,
      Dial: req.body.dial,
      Movement: req.body.movement,
      WaterResistance: req.body.waterResistance,
      Stock: parseInt(req.body.stock),
      Offer: req.body.offer === "true",
      DiscountPercentage: parseFloat(req.body.discount) || 0,
    };

    // Agrega el nuevo producto
    reloj.push(newProduct);
    let newProductSave = JSON.stringify(reloj, null, 2);
    fs.writeFileSync(
      path.resolve(__dirname, "../../data/products.json"),
      newProductSave
    );

    res.redirect("/admi/administrar");
  },

  // Página de edición de producto
  pageEditing: (req, res) => {
    const reloj = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../data/products.json"))
    );
    const relojId = parseInt(req.params.id);
    const relojEditar = reloj.find((relojes) => relojes.Id === relojId);
    res.render("admi/edit", {
      title: "Edición de Productos",
      edit: relojEditar,
    });
  },

  //actualizar producto
  updateProduct: (req, res) => {
    const relojPath = path.resolve(__dirname, "../../data/products.json");
    const reloj = JSON.parse(fs.readFileSync(relojPath));
    const currentProduct = reloj.find(
      (relojes) => relojes.Id === parseInt(req.params.id)
    );

    const updatedProduct = {
      Id: parseInt(req.params.id),
      Name: req.body.name,
      Description: req.body.description,
      Image: req.file
        ? `/images/productos/${req.file.filename}`
        : req.body.Image,
      Category: req.body.category,
      Colors: req.body.colors,
      Price: parseFloat(req.body.price),
      Brand: req.body.brand,
      Model: req.body.model,
      Box: req.body.box,
      Band: req.body.band,
      Dial: req.body.dial,
      Movement: req.body.movement,
      WaterResistance: req.body.waterResistance,
      Stock: parseInt(req.body.stock, 10),
      Offer: req.body.offer === "true",
      DiscountPercentage: parseFloat(req.body.discount) || 0,
    };

    if (req.file && currentProduct.Image) {
      const oldImagePath = path.resolve(
        __dirname,
        `../../public${currentProduct.Image}`
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const relojUpdate = reloj.map((relojes) =>
      relojes.Id === updatedProduct.Id ? updatedProduct : relojes
    );

    fs.writeFileSync(relojPath, JSON.stringify(relojUpdate, null, 2));

    res.redirect("/admi/administrar");
  },

  deleteProduct: (req, res) => {
    const productsPath = path.resolve(__dirname, "../../data/products.json");
    const products = JSON.parse(fs.readFileSync(productsPath));
    const productIdToDelete = req.params.id;

    const updatedProducts = products.filter(
      (product) => product.Id != productIdToDelete
    );

    fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2));

    res.redirect("/admi/administrar");
  },
};

module.exports = Administrar;
