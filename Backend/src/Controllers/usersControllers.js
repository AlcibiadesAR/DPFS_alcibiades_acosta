const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const path = require("path");
const db = require("../../database/models");
const fs = require("fs");
const User = db.User;
const {
  validacionesFormLogin,
  validacionesFormRegister,
} = require("../middleware/userValidations");

const usersControllers = {
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
      console.log("Errores de validación:", errors.mapped());
      return res.render("users/register", {
        title: "Crea tu cuenta / EleganceTimeShop",
        formData: req.body,
        errors: errors.mapped(),
      });
    }
  
    try {
      const { firstName, lastName, email, phone, password, userType } = req.body;
  
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
      console.log("Contraseña hasheada:", hashedPassword);
      const imageUrl = req.file
        ? `http://localhost:3000/images/users/${req.file.filename}`
        : null;
      console.log("URL de la imagen:", imageUrl);
  
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
      formData: {},
      errors: {},
    });
  },

  processForgotPassword: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("users/forgotPassword", {
        title: "Recupera tu contraseña",
        formData: { email: req.body.email },
        errors: errors.mapped(),
      });
    }

    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.render("users/forgotPassword", {
          title: "Recupera tu contraseña",
          formData: { email },
        });
      }

       res.redirect(`/users/resetPassword?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al procesar la solicitud.");
    }
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
        email: req.body.email || user.email,
      });

      req.session.user.email = req.body.email;

      res.redirect("/users/myAccount");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      res
        .status(500)
        .json({ message: "Ocurrió un error al actualizar el perfil" });
    }
  },

  pageResetPassword: (req, res) => {
    const { email } = req.query;
  
    res.render('users/resetPassword', {
      title: 'Crear una nueva contraseña',
      email,
      password: '',
      confirmPassword: '',
      errors: {}
    });
  },

  processResetPassword: async (req, res) => {
    const errors = validationResult(req);
  
    // Si hay errores de validación, renderiza el formulario de restablecimiento con los errores
    if (!errors.isEmpty()) {
      return res.render('users/resetPassword', {
        title: 'Crear una nueva contraseña',
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        errors: errors.mapped(),
      });
    }
  
    const { email, password, confirmPassword } = req.body;
  
    try {
      // Buscar al usuario por correo electrónico
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.render('users/resetPassword', {
          title: 'Crear una nueva contraseña',
          email,
          password,
          confirmPassword,
          errors: {
            email: { msg: 'No se encontró un usuario con ese correo electrónico.' },
          },
        });
      }
  
      // Actualizar la contraseña del usuario
      user.password = await bcrypt.hash(password, 10);
      await user.save();
  
      res.redirect('/users/login');
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      res.status(500).send('Error al procesar la solicitud.');
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.clearCookie("rememberedEmail");
      res.redirect("/users/login");
    });
  },
};

module.exports = usersControllers;
