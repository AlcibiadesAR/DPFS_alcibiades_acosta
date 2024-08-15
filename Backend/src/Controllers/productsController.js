const Products = {
  pageDetails: function (req, res) {
    return res.render("products/productDetail", {  
      title: "Detalle del producto / EleganceTimeShop",
    });
  },

  creacion: function (req, res) {
    return res.render("products/creacion", {  
      title: "Creación del producto / EleganceTimeShop",
    });
  },

  edicion: function (req, res) {
    return res.render("products/edicion", {  
      title: "Edición del producto / EleganceTimeShop",
    });
  }
};

module.exports = Products;