let usersControllers = {
  pageCart: (req, res) => {
    res.render("users/productCart", {
      title: "Tu Carrito de Compras / EleganceTimeShop",
    });
  },

  pageRegister: (req, res) => {
    return res.render("users/register", {
      title: "Crea tu cuenta / EleganceTimeShop",
    });
  },

  pageLogin: (req, res) => {
    return res.render("users/login", {
      title: "Inicia Sesión / EleganceTimeShop",
    });
  },

  pageForgotPassword: (req, res) => {
    return res.render("users/forgotPassword", {
      title: "Recupera tu contraseña / EleganceTimeShop",
    });
  },

  pageForgotNewPassword: (req, res) => {
    return res.render("users/forgotNewPassword", {
      title: "Crea una nueva contraseña / EleganceTimeShop",
    });
  },
};

module.exports = usersControllers;
