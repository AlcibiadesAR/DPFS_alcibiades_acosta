let authMiddleware = {
  MiddlewareAuth: (req, res, next) => {
    if (req.session.user) {
      req.user = req.session.user;

      if (req.user.type === "Administrador") {
        const restrictedRoutesForAdmin = [
          "/users/Account",
          
        ];

        if (
          restrictedRoutesForAdmin.some((route) => req.path.startsWith(route))
        ) {
          return res.status(401).render("error", {
            title: "Acceso Denegado",
            message: "No tienes permiso para acceder a esta página.",
          });
        }
        return next();
      }
      else if (req.user.type === "Registrado") {
        const restrictedRoutesForRegistered = [
          "/admiUsers/administrarUsers",
          "/admi/administrar",
        ];

        if (
          restrictedRoutesForRegistered.some((route) =>
            req.path.startsWith(route)
          )
        ) {
          return res.status(401).render("error", {
            title: "Acceso Denegado",
            message: "No tienes permiso para acceder a esta página.",
          });
        }
        return next();
      } else if (req.user.type === "guest") {
        return next();
      } else {
        return res.status(401).render("error", {
          title: "Acceso Denegado",
          message: "No tienes permiso para acceder a esta página.",
        });
      }
    } else {
      return res.redirect("/users/login");
    }
  },
};

module.exports = authMiddleware;
