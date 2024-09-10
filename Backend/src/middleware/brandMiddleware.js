const { Brand } = require('../../database/models'); 
const addBrandsToLocals = async (req, res, next) => {
  try {
    const brands = await Brand.findAll({
      attributes: ['name'],
      order: [['name', 'ASC']],
    });
    res.locals.marcas = brands.map(brand => brand.name);
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    res.locals.marcas = [];
  }
  next();
};

module.exports = addBrandsToLocals;