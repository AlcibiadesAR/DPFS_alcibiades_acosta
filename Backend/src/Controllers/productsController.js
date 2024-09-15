const DB = require("../../database/models");
const getProductsWithImages = require("../middleware/imageMiddleware");
const getCategoryIdByName = require("../middleware/categoryMiddleware");
const Product = DB.Product;
const op = DB.Sequelize.Op;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Products = {
  pageProducts: (req, res) => {
    const searchTerm = req.query.query || "";
    getProductsWithImages(searchTerm)
      .then((products) => {
        if (products.length > 0) {
          return res.render("products/products", {
            title: "Nuestros Relojes / EleganceTimeShop",
            lista: products,
            query: searchTerm,
          });
        } else {
          return res.render("products/products", {
            title: "Nuestros Relojes / EleganceTimeShop",
            lista: [],
            query: searchTerm,
            message:
              "No se encontraron productos que coincidan con su búsqueda.",
          });
        }
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
        return res.status(500).render("error", {
          title: "Error",
          message: "Hubo un problema al cargar los productos.",
        });
      });
  },

  pageOffer: (req, res, next) => {
    const searchTerm = req.query.query || "";

    getProductsWithImages(searchTerm)
      .then((products) => {
        const offerProducts = products.filter(
          (product) => product.discount_percentage > 0
        );

        if (offerProducts.length > 0) {
          return res.render("products/offer", {
            title: "Nuestras Ofertas / EleganceTimeShop",
            lista: offerProducts,
            query: searchTerm,
          });
        } else {
          return res.render("products/offer", {
            title: "Nuestras Ofertas / EleganceTimeShop",
            lista: [],
            query: searchTerm,
            message:
              "No se encontraron productos en oferta para el término de búsqueda proporcionado.",
          });
        }
      })
      .catch((error) => {
        console.error("Error al obtener ofertas:", error);
        return res.render("products/offer", {
          title: "Nuestras Ofertas / EleganceTimeShop",
          lista: [],
          query: searchTerm,
          message:
            "Hubo un problema al buscar productos. Por favor, intente nuevamente.",
        });
      });
  },

  pageCategory: (req, res, next) => {
    const category = req.params.category.toLowerCase();

    getCategoryIdByName(category)
      .then((categoryId) => {
        if (!categoryId) {
          return res.status(404).render("error", {
            title: "Error 404",
            message: `Categoría ${capitalizeFirstLetter(
              category
            )} no encontrada.`,
          });
        }

        return Product.findAll({
          include: [
            {
              association: "images",
              where: { image_type: "product" },
            },
          ],
          where: { category_id: categoryId },
        });
      })
      .then((products) => {
        if (products.length > 0) {
          return res.render("products/category", {
            title: `Relojes para ${capitalizeFirstLetter(
              category
            )} / EleganceTimeShop`,
            lista: products,
            TitleH1Category: `Relojes para ${capitalizeFirstLetter(category)}`,
          });
        } else {
          return res.status(404).render("error", {
            title: "Error 404",
            message: `No hay relojes para la categoría ${capitalizeFirstLetter(
              category
            )}`,
          });
        }
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        return next(new Error("Hubo un problema al cargar los productos."));
      });
  },

  pageDetails: (req, res, next) => {
    const id = parseInt(req.params.id);

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
      .then((pageDetailsID) => {
        if (pageDetailsID) {
          return Product.findAll({
            where: { id: { [op.ne]: id } },
            limit: 6,
            include: [{ association: "images" }],
          }).then((relatedProducts) => {
            return res.render("products/productDetail", {
              title: "Detalle del producto / EleganceTimeShop",
              details: pageDetailsID,
              relatedProducts: relatedProducts,
            });
          });
        } else {
          return res.status(404).render("error", {
            title: "Error 404",
            message: "Producto no encontrado.",
          });
        }
      })
      .catch(next);
  },

  pageBrand: (req, res, next) => {  
    const brandName = req.params.brand;
  
    Product.findAll({
      include: [
        { 
          association: 'images' 
        },
        { 
          association: 'brand', 
          where: { name: brandName }
        }
      ]
    })
    .then(products => {
      if (products.length > 0) {
        res.render('products/brand', {
          title: `${brandName}`,
          lista: products
        });
      } else {
        res.render('products/brand', {
          title: `Productos de ${brandName}`,
          lista: [],
          message: 'No se encontraron productos para esta marca.'
        });
      }
    })
    .catch(next);
  }
};

module.exports = Products;
