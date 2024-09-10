const DB = require("../../database/models");
const Category = DB.Category;

const getCategoryIdByName = async (categoryName) => {
  try {
    const category = await Category.findOne({
      where: { name: categoryName }
    });
    return category ? category.id : null;
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    throw error;
  }
};

module.exports = getCategoryIdByName;