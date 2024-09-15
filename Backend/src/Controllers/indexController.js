const db = require("../../database/models");
const op = db.Sequelize.Op;

let Home = {
  pageHome: async (req, res, next) => {
    try {
      const searchTerm = req.query.query || ''; 
      const category = await db.Category.findOne({
        where: { name: 'Niños' }
      });

      if (!category) {
        throw new Error('Categoría "Niños" no encontrada');
      }

      const offerProducts = await db.Product.findAll({
        where: {
          offer: 1,
          [op.or]: [
            { name: { [op.like]: `%${searchTerm}%` } },
            { description: { [op.like]: `%${searchTerm}%` } }
          ]
        },
        limit: 4,
        include: [
          {
            model: db.ProductImage,
            as: "images",
            where: { image_type: 'product' }
          }
        ]
      });

      const kidsWatches = await db.Product.findAll({
        where: {
          category_id: category.id,
          [op.or]: [
            { name: { [op.like]: `%${searchTerm}%` } },
            { description: { [op.like]: `%${searchTerm}%` } }
          ]
        },
        limit: 4,
        include: [
          {
            model: db.ProductImage,
            as: "images",
            where: { image_type: 'product' }
          }
        ]
      });

      return res.render("index", {
        title: "EleganceTimeShop",
        headerClass: "header-transparent",
        offerProducts: offerProducts,
        kidsWatches: kidsWatches,
      });
    } catch (error) {
      console.error("Error al obtener productos: ", error);
      next(error); 
    }
  },
};

module.exports = Home;