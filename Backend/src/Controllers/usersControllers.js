const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const path = require("path");
const db = require("../../database/models");
const fs = require("fs");

// Validaciones para el formulario de login
const validacionesFormLogin = [
  check("email").exists().isEmail().withMessage("Debe ser un email válido"),
  check("password").notEmpty().withMessage("La contraseña es requerida"),
];

// Validaciones para el formulario de registro
const validacionesFormRegister = [
  ...validacionesFormLogin,

  check("firstName")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isAlpha()
    .withMessage("El nombre debe contener solo letras"),

  check("lastName")
    .notEmpty()
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

  procesarFormRegister: async (req, res) => {
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
      if (!firstName || !lastName) {
        return res.render("users/register", {
          title: "Crea tu cuenta / EleganceTimeShop",
          formData: req.body,
          errors: {
            general: {
              msg: "Por favor, complete todos los campos obligatorios.",
            },
          },
        });
      }

      const existingUser = await db.User.findOne({ where: { email } });
      if (existingUser) {
        return res.render("users/register", {
          title: "Crea tu cuenta / EleganceTimeShop",
          formData: req.body,
          errors: { email: { msg: "El email ya está registrado" } },
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const imageUrl = req.file
        ? `http://localhost:3000/images/users/${req.file.filename}`
        : null;
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
        type: userType,
        phone,
        url: imageUrl, 
      };

      await db.User.create(newUser);

      res.redirect("/users/login");
    } catch (error) {
      console.error("Error al procesar el registro:", error);
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

  procesarFormLogin: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/login", {
        title: "Inicia Sesión / EleganceTimeShop",
        formData: req.body,
        errors: errors.mapped(),
      });
    }

    const { email, password, rememberMe } = req.body;

    try {
      const user = await db.User.findOne({ where: { email } });
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

      if (rememberMe) {
        res.cookie("rememberedEmail", email, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
      } else {
        res.clearCookie("rememberedEmail");
        req.session.cookie.expires = false;
      }

      req.session.user = user;
      res.redirect("/");
    } catch (error) {
      console.error("Error al procesar el login:", error);
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

  pageMyAccount: async (req, res) => {
    try {
      const userId = req.session.user.id;
      const user = await db.User.findOne({
        where: { id: userId },
      });

      if (!user) {
        return res
          .status(404)
          .render("404", { title: "Usuario no encontrado" });
      }

      return res.render("users/Account", {
        title: "Mi Cuenta / EleganceTimeShop",
        user,
      });
    } catch (error) {
      console.error("Error al cargar la cuenta del usuario:", error);
      res
        .status(500)
        .json({ message: "Ocurrió un error al cargar la cuenta del usuario" });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = req.session.user.id;
      const imageUrl = req.file
        ? `http://localhost:3000/images/users/${req.file.filename}`
        : null;
  
      const user = await db.User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Actualizar la imagen si existe
      if (req.file) {
        if (user.url) {
          const oldImagePath = path.join(
            __dirname,
            "../../public",
            user.url.replace("http://localhost:3000", "")
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
  
        await user.update({ url: imageUrl });
      }
  
      await user.update({
        first_name: req.body.firstName || user.first_name,
        last_name: req.body.lastName || user.last_name,
        phone: req.body.phone || user.phone,
        email: req.body.email || user.email 
      });
  
      req.session.user.email = req.body.email;
  
      res.redirect('/users/Account');
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      res
        .status(500)
        .json({ message: "Ocurrió un error al actualizar el perfil" });
    }
  },

  logout: (req, res) => {
    console.log('Logout function called');
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
        return res.status(500).json({ message: 'Error al cerrar sesión' });
      }
      console.log('Session destroyed');
      res.clearCookie('connect.sid', { path: '/' }); // Clear the session cookie
      console.log('Cookie cleared');
      res.redirect('/users/login');    
    });
  }
};

module.exports = usersControllers;
