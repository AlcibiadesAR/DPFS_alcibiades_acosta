let usersControllers = {
  pageCart: function (req, res) {
    res.render("users/productCart", {
      title: "Tu Carrito de Compras / EleganceTimeShop",
    });
  },

  pageRegister: function (req, res) {
    return res.render("users/register", {
      title: "Crea tu cuenta / EleganceTimeShop",
    });
  },

  pageLogin: function (req, res) {
    return res.render("users/login", { title: "Inicia Sesión / EleganceTimeShop" });
  },

  pageForgotPassword: function (req, res) {
    return res.render("users/forgot-password", {
      title: "Recupera tu contraseña / EleganceTimeShop",
    });
  },

  pageForgotNewPassword: function (req, res) {
    return res.render("users/forgot-new-password", {
      title: "Crea una nueva contraseña / EleganceTimeShop",
    });
  },
};

module.exports = usersControllers;
