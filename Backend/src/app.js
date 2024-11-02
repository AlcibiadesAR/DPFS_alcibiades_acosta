var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
require("dotenv").config();
const addBrandsToLocals = require("./middleware/brandMiddleware");
const cors = require('cors');

var indexRouter = require("./routes/index");
let productsRouter = require("./routes/products");
let usersRouter = require("./routes/users");
let admiRouter = require("./routes/admi");
let admiUsersRouter = require("./routes/admiUsers");
let cartRoutes = require("./routes/cart");
let apisRoutes = require("./routes/apis");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "Proyecto final",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(addBrandsToLocals);
app.use(cors());
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Rutas
app.use("/", indexRouter);
app.use("/", productsRouter);
app.use("/", usersRouter);
app.use("/", admiRouter);
app.use("/", admiUsersRouter);
app.use("/", cartRoutes);
app.use("/", apisRoutes);

// Captura 404 y envía al manejador de errores
app.use(function (req, res, next) {
  res.status(404).render("error", {
    title: "Error 404",
    message: "Página no encontrada",
  });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", {
    title: "Error 500",
    message: "Error interno del servidor",
  });
});
module.exports = app;
