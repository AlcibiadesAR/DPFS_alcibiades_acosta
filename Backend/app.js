var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
let productDetailRouter = require("./routes/products");
let productCartRouter = require("./routes/cart");
let authRouter = require("./routes/auth");

var app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/", indexRouter);
app.use("/", productDetailRouter);
app.use("/", productCartRouter);
app.use("/", authRouter);

// Captura 404 y envía al manejador de errores
app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, "views", "error.html"));
});

// Manejador de errores
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.sendFile(path.join(__dirname, "views", "error.html"));
});

module.exports = app;
