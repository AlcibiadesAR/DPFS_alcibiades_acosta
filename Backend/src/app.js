var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");
const session = require('express-session');
require('dotenv').config();

var indexRouter = require("./routes/index");
let productsRouter = require("./routes/products");
let usersRouter = require("./routes/users");
let admiRouter = require("./routes/admi");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

function authMiddleware(req, res, next) {
  if (req.session.user && req.session.user.role !== 'guest') {
    next(); 
  } else {
    res.redirect('/login'); 
  }
}

module.exports = authMiddleware;

// Rutas
app.use("/", indexRouter);
app.use("/", productsRouter);
app.use("/", usersRouter);
app.use("/", admiRouter);

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
