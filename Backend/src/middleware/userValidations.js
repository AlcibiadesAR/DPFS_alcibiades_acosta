const { check } = require("express-validator");
const path = require("path");
const db = require("../../database/models");

// Validaciones para el formulario de login
const validacionesFormLogin = [
  check("email")
    .exists()
    .withMessage("El campo de correo electrónico es requerido")
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido")
    .custom(async (value) => {
      const user = await db.User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error("El correo electrónico no existe en la base de datos");
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;"'<>,.?~\\/-]).+$/,
      "i"
    )
    .withMessage(
      "La contraseña debe incluir letras mayúsculas, minúsculas, números y caracteres especiales"
    ),
];

// Validaciones para el formulario de registro
const validacionesFormRegister = [
  check("email")
    .exists()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .custom(async (value) => {
      const existingUser = await db.User.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),

  check("firstName")
    .exists()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El nombre debe contener solo letras"),

  check("lastName")
    .exists()
    .withMessage("El apellido es requerido")
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener al menos 2 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El apellido debe contener solo letras"),

  check("password")
    .exists()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;"'<>,.?~\\/-]).+$/,
      "i"
    )
    .withMessage(
      "La contraseña debe incluir letras mayúsculas, minúsculas, números y caracteres especiales"
    ),

  check("phone")
    .optional()
    .matches(/^\d{4}-\d{4}$/)
    .withMessage("El número de teléfono debe tener el formato 1234-6780"),

  check("userType")
    .isIn(["Registrado", "Administrador"])
    .withMessage("Tipo de usuario inválido"),

    check("avatar").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("La imagen de perfil es requerida.");
      }
  
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
      const fileExtension = path.extname(req.file.originalname).toLowerCase();
  
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error("El archivo debe ser una imagen en formato JPG, JPEG, PNG o GIF.");
      }
  
      return true;
    }),
    
  check("terms")
    .equals("on")
    .withMessage("Debes aceptar los términos y condiciones"),
];

const validacionesFormRecuperacionPassword = [
  check("email")
    .notEmpty()
    .withMessage("El campo de correo electrónico no puede estar vacío")
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido")
    .custom(async (value) => {
      const user = await db.User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error("El correo electrónico no existe en la base de datos");
      }
      return true;
    }),
];

const validacionesFormResetPassword = [
  check("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;"'<>,.?~\\/-]).+$/,
      "i"
    )
    .withMessage(
      "La contraseña debe incluir letras mayúsculas, minúsculas, números y caracteres especiales"
    ),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Debe confirmar la contraseña.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden.");
      }
      return true;
    }),
];

module.exports = {
  validacionesFormLogin,
  validacionesFormRegister,
  validacionesFormRecuperacionPassword,
  validacionesFormResetPassword,
};
