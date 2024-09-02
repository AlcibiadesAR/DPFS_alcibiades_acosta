const productDB = require("../../data/products.json");

const Products = {
  // Página del catálogo de productos
  pageProducts: (req, res) => {
    try {
      let listOfWatches = productDB;
      return res.render("products/products", {
        title: "Nuestros Relojes / EleganceTimeShop",
        lista: listOfWatches,
      });
    } catch (error) {
      console.error("Error al cargar el catálogo de productos:", error);
      return res.status(500).render("error", {
        title: "Error",
        message: "Hubo un problema al cargar los productos.",
      });
    }
  },

  // Página de ofertas
  pageOffer: (req, res, next) => {
    try {
      let offerProducts = productDB.filter((product) => product.Offer === true);

      if (offerProducts.length > 0) {
        return res.render("products/offer", {
          title: "Nuestras Ofertas / EleganceTimeShop",  
          lista: offerProducts,
        });
      } else {
        let err = new Error("No hay relojes en oferta");
        err.status = 404;
        return next(err);
      }
    } catch (error) {
      console.error("Error al obtener ofertas:", error);
      let err = new Error("Hubo un problema al cargar las ofertas.");
      err.status = 500;
      return next(err);
    }
  },

  pageCategory: (req, res) => {
    try {
      const category = req.params.category.toLowerCase();
      const categoryProducts = productDB.filter((product) => {
        return product.Category && product.Category.toLowerCase() === category;
      });

      if (categoryProducts.length) {
        return res.render("products/category", {
          title: `Relojes para ${
            category.charAt(0).toUpperCase() + category.slice(1)
          } / EleganceTimeShop`,
          
          lista: categoryProducts,
          TitleH1Category: `Relojes para ${
            category.charAt(0).toUpperCase() + category.slice(1)
          }`,
        });
      }
      return res.status(404).render("error", {
        title: "Error 404",
        message: `No hay relojes para la categoría ${
          category.charAt(0).toUpperCase() + category.slice(1)
        }`,
      });
    } catch (error) {
      console.error("Error al cargar la categoría:", error);
      return res.status(500).render("error", {
        title: "Error",
        message: "Hubo un problema al cargar la categoría.",
      });
    }
  },

  // Página de detalles del producto
  pageDetails: (req, res, next) => {
    let id = parseInt(req.params.id);
    let pageDetailsID = productDB.find((watch) => watch.Id === id);

    if (pageDetailsID) {
      let relatedProducts = productDB
        .filter((watch) => watch.Id !== id)
        .slice(0, 6);

      return res.render("products/productDetail", {
        title: "Detalle del producto / EleganceTimeShop",
        details: pageDetailsID,
        relatedProducts: relatedProducts,
      });
    }
  },
};

module.exports = Products;
