const DB = require("../../database/models");
const Product = DB.Product;
const ProductImage = DB.ProductImage;
const path = require("path");
const fs = require("fs");

const Administrar = {
  // Página para administrar productos
  pageAdministrar: (req, res) => {
    Product.findAll()
      .then((productos) => {
        res.render("admi/administrar", {
          title: "Administrar",
          list: productos,
        });
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
        res.status(500).render("error", {
          title: "Error",
          message: "Hubo un problema al cargar los productos.",
        });
      });
  },

  searchProducts: (req, res) => {
    const query = req.query.query;
    if (!query) {
      DB.Product.findAll()
        .then((products) => {
          res.render("admi/administrar", {
            title: "Administrar Productos",
            list: products,
            searchId: query,
            message:
              products.length === 0 ? "No se encontraron productos." : "",
          });
        })
        .catch((error) => {
          console.error("Error al buscar productos:", error);
          res.status(500).render("admi/administrar", {
            title: "Administrar Productos",
            list: [],
            searchId: query,
            error: "Hubo un problema al buscar los productos.",
          });
        });
    } else {
      // Buscar productos por ID o nombre
      DB.Product.findAll({
        where: {
          [DB.Sequelize.Op.or]: [
            { id: query },
            { name: { [DB.Sequelize.Op.like]: `%${query}%` } },
          ],
        },
      })
        .then((products) => {
          res.render("admi/administrar", {
            title: "Administrar Productos",
            list: products,
            searchId: query,
            message:
              products.length === 0 ? "No se encontraron productos." : "",
          });
        })
        .catch((error) => {
          console.error("Error al buscar productos:", error);
          res.status(500).render("admi/administrar", {
            title: "Administrar Productos",
            list: [],
            searchId: query,
            error: "Hubo un problema al buscar los productos.",
          });
        });
    }
  },

  // Página de creación de producto
  pageCreate: (req, res) => {
    res.render("admi/create", {
      title: "Creación de productos",
    });
  },

  createProduct: async (req, res) => {
    try {
      const info = req.body;
      const offerValue = info.offer === "true" ? 1 : 0;
      const discountPercentage = parseInt(info.discount, 10) || 0;

      const newProduct = await DB.Product.create({
        name: info.name,
        description: info.description,
        price: parseFloat(info.price),
        stock: parseInt(info.stock, 10),
        offer: offerValue,
        discount_percentage: discountPercentage,
      });

      const associations = [
        {
          model: DB.Category,
          key: "category",
          column: "name",
          method: "setCategory",
        },
        { model: DB.Color, key: "colors", column: "name", method: "setColor" },
        { model: DB.Brand, key: "brand", column: "name", method: "setBrand" },
        { model: DB.Model, key: "model", column: "name", method: "setModel" },
        { model: DB.Box, key: "box", column: "description", method: "setBox" },
        {
          model: DB.Band,
          key: "band",
          column: "description",
          method: "setBand",
        },
        {
          model: DB.Dial,
          key: "dial",
          column: "description",
          method: "setDial",
        },
        {
          model: DB.Movement,
          key: "movement",
          column: "description",
          method: "setMovement",
        },
        {
          model: DB.WaterResistance,
          key: "waterResistance",
          column: "description",
          method: "setWaterResistance",
        },
      ];

      for (const association of associations) {
        let entity = await association.model.findOne({
          where: { [association.column]: info[association.key] },
        });

        if (!entity) {
          entity = await association.model.create({
            [association.column]: info[association.key],
          });
        }
        await newProduct[association.method](entity.id);
      }

      if (req.file) {
        const imageUrl = `http://localhost:3000/images/productos/${req.file.filename}`;
        await DB.ProductImage.create({
          product_id: newProduct.id,
          image_type: "product",
          url: imageUrl,
        });
      }

      res.redirect("/admi/administrar");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).render("error", {
        title: "Error",
        message: "Hubo un problema al crear el producto.",
      });
    }
  },

  // Página de edición de producto
  pageEditing: (req, res) => {
    const id = req.params.id;

    Product.findByPk(id, {
      include: [
        { association: "images" },
        { association: "category" },
        { association: "color" },
        { association: "brand" },
        { association: "model" },
        { association: "box" },
        { association: "dial" },
        { association: "movement" },
        { association: "band" },
        { association: "waterResistance" },
      ],
    })
      .then((producto) => {
        console.log("Producto:", producto);
        if (producto) {
          res.render("admi/edit", {
            title: "Edición de Productos",
            edit: producto,
          });
        } else {
          res.status(404).render("error", {
            title: "Error 404",
            message: "Producto no encontrado.",
          });
        }
      })
      .catch((error) => {
        console.error("Error al cargar el producto para edición:", error);
        res.status(500).render("error", {
          title: "Error",
          message: "Hubo un problema al cargar el producto para edición.",
        });
      });
  },

  // Actualizar producto
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const info = req.body;
      const product = await DB.Product.findByPk(id);

      if (!product) {
        return res.status(404).render("error", {
          title: "Producto no encontrado",
          message: "El producto que intentas actualizar no existe.",
        });
      }

      const offerValue = info.offer === "true" ? 1 : 0;
      const discountPercentage = parseInt(info.discount, 10) || 0;

      await product.update({
        name: info.name,
        description: info.description,
        price: parseFloat(info.price),
        stock: parseInt(info.stock, 10),
        offer: offerValue,
        discount_percentage: discountPercentage,
      });

      console.log("Producto actualizado:", product);

      const associations = [
        {
          model: DB.Category,
          key: "category",
          column: "name",
          method: "setCategory",
        },
        { model: DB.Color, key: "colors", column: "name", method: "setColor" },
        { model: DB.Brand, key: "brand", column: "name", method: "setBrand" },
        { model: DB.Model, key: "model", column: "name", method: "setModel" },
        { model: DB.Box, key: "box", column: "description", method: "setBox" },
        {
          model: DB.Band,
          key: "band",
          column: "description",
          method: "setBand",
        },
        {
          model: DB.Dial,
          key: "dial",
          column: "description",
          method: "setDial",
        },
        {
          model: DB.Movement,
          key: "movement",
          column: "description",
          method: "setMovement",
        },
        {
          model: DB.WaterResistance,
          key: "waterResistance",
          column: "description",
          method: "setWaterResistance",
        },
      ];

      for (const association of associations) {
        let entity = await association.model.findOne({
          where: { [association.column]: info[association.key] },
        });

        if (!entity) {
          entity = await association.model.create({
            [association.column]: info[association.key],
          });
        }

        console.log(`Asociando ${association.key} con ID:`, entity.id);
        await product[association.method](entity.id);
      }

      if (req.file) {
        const existingImage = await DB.ProductImage.findOne({
          where: { product_id: product.id },
        });

        if (existingImage) {
          const imageUrl = `http://localhost:3000/images/productos/${req.file.filename}`;
          await existingImage.update({ url: imageUrl });
        } else {
          const imageUrl = `http://localhost:3000/images/productos/${req.file.filename}`;
          await DB.ProductImage.create({
            product_id: product.id,
            image_type: "product",
            url: imageUrl,
          });
        }

        console.log("Imagen actualizada/creada con URL:", imageUrl);
      }

      res.redirect("/admi/administrar");
    } catch (error) {
      res.status(500).render("error", {
        title: "Error",
        message: "Hubo un problema al actualizar el producto.",
      });
    }
  },

  // Eliminar producto
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [{ association: "images" }],
      });

      if (!product) {
        throw new Error("Producto no encontrado.");
      }

      if (product.images && product.images.length > 0) {
        product.images.forEach((image) => {
          const oldImagePath = path.resolve(
            __dirname,
            `../../public/images/productos/${image.url.split("/").pop()}`
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        });
      }
      await ProductImage.destroy({
        where: { product_id: product.id },
      });
      await Product.destroy({
        where: { id: req.params.id },
      });

      res.redirect("/admi/administrar");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.status(500).render("error", {
        title: "Error",
        message: "Hubo un problema al eliminar el producto.",
      });
    }
  },
};

module.exports = Administrar;
