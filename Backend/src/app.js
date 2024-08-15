var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
let productDetailRouter = require("./routes/products");
let usersRouter = require("./routes/users");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// Rutas
app.use("/", indexRouter);
app.use("/", productDetailRouter);
app.use("/", usersRouter);

// Captura 404 y envía al manejador de errores
app.use(function (req, res, next) {
  res
    .status(404)
    .render("error", { title: "Error 404", message: "Página no encontrada" });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
module.exports = app;
