const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const { title } = require("process");

const userDBPath = path.resolve(__dirname, process.env.DB_PATH);

const validacionesFormLogin = [
  check("email").exists().isEmail().withMessage("Debe ser un email válido"),
  check("password").notEmpty().withMessage("La contraseña es requerida"),
];

const validacionesFormRegister = [
  ...validacionesFormLogin,

  check("firstName")
    .not()
    .isEmpty()
    .withMessage("El nombre es requerido")
    .isAlpha()
    .withMessage("El nombre debe contener solo letras"),

  check("lastName")
    .not()
    .isEmpty()
    .withMessage("El apellido es requerido")
    .isAlpha()
    .withMessage("El apellido debe contener solo letras"),

  check("phone")
    .optional()
    .matches(/^\d{4}-\d{4}$/)
    .withMessage("El número de teléfono debe tener el formato 1234-6780"),

  check("userType")
    .isIn(["Registrado", "Administrador"])
    .withMessage("Tipo de usuario inválido"),

  check("avatar")
    .optional()
    .custom((value, { req }) => {
      if (
        req.file &&
        ![".jpg", ".jpeg", ".png"].includes(
          path.extname(req.file.originalname).toLowerCase()
        )
      ) {
        throw new Error(
          "El archivo debe ser una imagen en formato JPG, JPEG o PNG."
        );
      }
      return true;
    }),

  check("terms")
    .equals("on")
    .withMessage("Debes aceptar los términos y condiciones"),
];

const usersControllers = {
  pageCart: (req, res) => {
    res.render("users/productCart", {
      title: "Tu Carrito de Compras / EleganceTimeShop",
    });
  },

  pageRegister: (req, res) => {
    return res.render("users/register", {
      title: "Crea tu cuenta / EleganceTimeShop",
      formData: {},
      errors: {},
    });
  },

  validacionesFormRegister,

  procesarFormRegister: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/register", {
        title: "Crea tu cuenta / EleganceTimeShop",
        formData: req.body,
        errors: errors.mapped(),
      });
    }

    try {
      const { firstName, lastName, email, phone, password, userType } =
        req.body;

      let users = [];
      if (fs.existsSync(userDBPath)) {
        const data = fs.readFileSync(userDBPath);
        users = JSON.parse(data);
      }

      // Verificar si el correo electrónico ya está registrado
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        return res.render("users/register", {
          title: "Crea tu cuenta / EleganceTimeShop",
          formData: req.body,
          errors: { email: { msg: "El email ya está registrado" } },
        });
      }

      const newUserId = users.length ? users[users.length - 1].id + 1 : 1;
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = {
        id: newUserId,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        type: userType,
        phone,
        avatar: req.file ? `/images/users/${req.file.filename}` : null,
      };

      users.push(newUser);

      fs.writeFileSync(userDBPath, JSON.stringify(users, null, 2));

      res.redirect("/users/login");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ocurrió un error al procesar el formulario" });
    }
  },

  pageLogin: (req, res) => {
    const rememberedEmail = req.cookies.rememberedEmail || ""; 
    return res.render("users/login", {
      title: "Inicia Sesión / EleganceTimeShop",
      formData: { email: rememberedEmail },
      errors: {},
    });
  },

  validacionesFormLogin,

  procesarFormLogin: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/login", {
        title: "Inicia Sesión / EleganceTimeShop",
        formData: req.body,
        errors: errors.mapped(),
      });
    }
  
    const { email, password, rememberMe } = req.body; // Asegúrate de capturar rememberMe
  
    try {
      let users = [];
      if (fs.existsSync(userDBPath)) {
        const data = fs.readFileSync(userDBPath);
        users = JSON.parse(data);
      }
  
      const user = users.find((user) => user.email === email);
  
      if (!user) {
        return res.render("users/login", {
          title: "Inicia Sesión / EleganceTimeShop",
          formData: req.body,
          errors: { email: { msg: "El email no está registrado" } },
        });
      }
  
      const match = bcrypt.compareSync(password, user.password);
  
      if (!match) {
        return res.render("users/login", {
          title: "Inicia Sesión / EleganceTimeShop",
          formData: req.body,
          errors: { password: { msg: "La contraseña es incorrecta" } },
        });
      }
  
      // Lógica para "Recordarme"
      if (rememberMe) {
        res.cookie('rememberedEmail', email, { maxAge: 30 * 24 * 60 * 60 * 1000 }); 
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; 
      } else {
        res.clearCookie('rememberedEmail'); 
        req.session.cookie.expires = false; 
      }
  
      req.session.user = user;
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ocurrió un error al procesar el formulario" });
    }
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

  pageMyAccount: (req, res) => {
    const user = req.session.user;
    return res.render("users/myAccount", {
      title: "Mi Cuenta / EleganceTimeShop",
      user,
    });
  },
};

module.exports = usersControllers;
