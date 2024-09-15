const DB = require("../../database/models");

const APIS = {
  // Listar productos
  apiProductsList: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      
      const { count, rows } = await DB.Product.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [
          { association: "images" },
          { association: "category" }
        ],
      });

      //conteo de productos por categoría
      const countByCategory = await DB.Product.findAll({
        attributes: [
          'category_id',
          [DB.Sequelize.fn('COUNT', DB.Sequelize.col('category_id')), 'count'],
        ],
        group: 'category_id',
        raw: true,
      });

      // nombres de las categorías
      const categoryIds = countByCategory.map(item => item.category_id);
      const categories = await DB.Category.findAll({
        where: {
          id: categoryIds,
        },
        attributes: ['id', 'name'],
        raw: true,
      });

      // Mapear nombres de categorías
      const categoryNames = categories.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {});

      //  conteo y nombres de las categorías
      const categoryCount = countByCategory.map(item => ({
        category: categoryNames[item.category_id] || 'Desconocida',
        count: item.count,
      }));

      res.json({
        count,
        countByCategory: categoryCount,
        products: rows.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          detail: `http://localhost:3000/api/products/${product.id}`,
          images: product.images.map((image) => image.url),
          category: product.category ? product.category.name : null,
        })),
        next:
          count > offset + limit
            ? `http://localhost:3000/api/products/?page=${parseInt(page) + 1}&limit=${limit}`
            : null,
        previous:
          page > 1
            ? `http://localhost:3000/api/products/?page=${parseInt(page) - 1}&limit=${limit}`
            : null,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Detalles de un producto
  apiProductDetails: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await DB.Product.findByPk(id, {
        include: [
          { association: "images" },
          { association: "category" },
          { association: "color" },
          { association: "brand" },
          { association: "model" },
          { association: "box" },
          { association: "dial" },
          { association: "movement" },
          { association: "band" },
          { association: "waterResistance" },
        ],
      });

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images.map((image) => image.url),
        category: product.category ? product.category.name : null,
        color: product.color ? product.color.name : null,
        brand: product.brand ? product.brand.name : null,
        model: product.model ? product.model.name : null,
        box: product.box ? product.box.description : null,
        dial: product.dial ? product.dial.description : null,
        movement: product.movement ? product.movement.description : null,
        band: product.band ? product.band.description : null,
        waterResistance: product.waterResistance
          ? product.waterResistance.description
          : null,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Listar usuarios
  apiUsersList: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const { count, rows } = await DB.User.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      res.json({
        count,
        users: rows.map((user) => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          detail: `http://localhost:3000/api/users/${user.id}`,
        })),
        next:
          count > offset + limit
            ? `http://localhost:3000/api/users/?page=${parseInt(page) + 1}&limit=${limit}`
            : null,
        previous:
          page > 1
            ? `http://localhost:3000/api/users/?page=${parseInt(page) - 1}&limit=${limit}`
            : null,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Detalles de un usuario
  apiUserDetails: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await DB.User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.json({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profileImage: user.url
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Último producto creado
  apiLastProduct: async (req, res) => {
    try {
      const lastProduct = await DB.Product.findOne({
        order: [['created_at', 'DESC']],  
        include: [
          { association: "category" }
        ],
      });
  
      if (!lastProduct) {
        return res.status(404).json({ error: "No se ha encontrado ningún producto" });
      }
  
      res.json({
        name: lastProduct.name,
        category: lastProduct.category ? lastProduct.category.name : null,
        price: lastProduct.price,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
};

module.exports = APIS;
