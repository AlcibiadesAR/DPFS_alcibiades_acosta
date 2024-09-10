const DB = require("../../database/models");
const Op = DB.Sequelize.Op;

const getProductsWithImages = async (searchTerm = '') => {
  try {
    const products = await DB.Product.findAll({
      include: [
        {
          model: DB.ProductImage,
          as: "images",
          where: { image_type: 'product' }
        }
      ],
      where: {
        name: {
          [Op.like]: `%${searchTerm}%`
        }
      }
    });

    if (products.length === 0) {
      return { message: 'No se encontró el producto solicitado.' };
    }

    return products;
  } catch (error) {
    console.error('Error al cargar los productos:', error);
    throw new Error('Error al procesar la solicitud.');
  }
};

module.exports = getProductsWithImages;
