let authMiddleware = {
  MiddlewareAuth: (req, res, next) => {
    if (req.session.user && req.session.user.role !== "guest") {
      next(); 
    } else {
      res.redirect("/users/login"); 
    }
  },
};

module.exports = authMiddleware

