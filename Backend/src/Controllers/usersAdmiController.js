const DB = require("../../database/models");
const User = DB.User;
const bcrypt = require("bcrypt");

const usersAdmiControllers = {
  pageAdmiUsers: (req, res) => {
    User.findAll()
      .then((users) => {
        res.render("admiUsers/administrarUsers", {
          title: "Gestión de Usuarios",
          list: users,
        });
      })
      .catch((error) => {
        console.error("Error al cargar los usuarios:", error);
        res.status(500).render("error", {
          title: "Error",
          message: "Hubo un problema al cargar los usuarios.",
        });
      });
  },

  searchUsers: (req, res) => {
    const query = req.query.query;

    if (!query) {
      DB.User.findAll()
        .then((users) => {
          res.render("admiUsers/administrarUsers", {
            title: "Administrar Usuarios",
            list: users,
            searchId: query,
            message: users.length === 0 ? "No se encontraron usuarios." : "",
          });
        })
        .catch((error) => {
          console.error("Error al buscar usuarios:", error);
          res.status(500).render("admiUsers/administrarUsers", {
            title: "Administrar Usuarios",
            list: [],
            searchId: query,
            error: "Hubo un problema al buscar los usuarios.",
          });
        });
    } else {
      const queryAsNumber = parseInt(query, 10);

      DB.User.findAll({
        where: {
          [DB.Sequelize.Op.or]: [
            queryAsNumber ? { id: queryAsNumber } : null,
            { first_name: { [DB.Sequelize.Op.like]: `%${query}%` } },
            { last_name: { [DB.Sequelize.Op.like]: `%${query}%` } },
          ].filter(Boolean),
        },
      })
        .then((users) => {
          res.render("admiUsers/administrarUsers", {
            title: "Administrar Usuarios",
            list: users,
            searchId: query,
            message: users.length === 0 ? "No se encontraron usuarios." : "",
          });
        })
        .catch((error) => {
          console.error("Error al buscar usuarios:", error);
          res.status(500).render("admiUsers/administrarUsers", {
            title: "Administrar Usuarios",
            list: [],
            searchId: query,
            error: "Hubo un problema al buscar los usuarios.",
          });
        });
    }
  },

  createUsers: (req, res) => {
    return res.render("admiUsers/createUsers", {
      title: "Creación de Usuario / EleganceTimeShop",
      formData: {},
      errors: {},
    });
  },

  createUsersAdmi: async (req, res) => {
    try {
      const { firstName, lastName, email, password, phone, userType } =
        req.body;
      const avatar = req.file ? req.file.filename : null;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.render("admiUsers/createUsers", {
          formData: req.body,
          errors: {
            email: { msg: "El correo electrónico ya está registrado." },
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
        phone,
        type: userType,
        url: avatar ? `http://localhost:3000/images/users/${avatar}` : null,
      });

      res.redirect("/admiUsers/administrarUsers");
    } catch (error) {
      console.error("Error al procesar el registro:", error);
      res
        .status(500)
        .json({ message: "Ocurrió un error al procesar el formulario" });
    }
  },

  pageUserDetails: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.render("admiUsers/detailsUsers", {
        title: "Detalles del Usuario / EleganceTimeShop",
        user,
      });
    } catch (error) {
      console.error("Error al cargar los detalles del usuario:", error);
      res.status(500).json({
        message: "Ocurrió un error al cargar los detalles del usuario",
      });
    }
  },

  pageUserEdit: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.render("admiUsers/editUsers", {
        title: "Edición del Usuario / EleganceTimeShop",
        user,
      });
    } catch (error) {
      console.error("Error al cargar los detalles del usuario:", error);
      res.status(500).json({
        message: "Ocurrió un error al cargar los detalles del usuario",
      });
    }
  },

  updateProfileAdmi: async (req, res) => {
    try {
      const userId = req.params.id;
      const { firstName, lastName, email, phone, type } = req.body;

      const [updated] = await User.update(
        { first_name: firstName, last_name: lastName, email, phone, type },
        { where: { id: userId } }
      );

      if (updated) {
        res.redirect("/admiUsers/administrarUsers");
      } else {
        res
          .status(404)
          .send("Usuario no encontrado o no se realizaron cambios");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al actualizar el usuario");
    }
  },
};

module.exports = usersAdmiControllers;
