const fs = require("fs");
const path = require("path");

const validateAvatarFormat = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const fileExtension = path.extname(req.file.originalname).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    const filePath = path.resolve(__dirname, "../../public/images/users", req.file.filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error al eliminar el archivo:", err);
      }
      return res.render("users/register", {
        title: "Crea tu cuenta / EleganceTimeShop",
        formData: req.body,
        errors: { avatar: { msg: "El archivo debe ser una imagen en formato JPG, JPEG, PNG o GIF." } },
      });
    });
  } else {
    next(); 
  }
};

module.exports = validateAvatarFormat;
