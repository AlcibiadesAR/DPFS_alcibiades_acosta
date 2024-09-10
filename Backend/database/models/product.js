module.exports = function (sequelize, DataTypes) {
  let alias = "Product";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    offer: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    discount_percentage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  };

  let config = {
    tableName: "product",
    timestamps: true,
    underscored: true,
  };

  let Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });

    Product.belongsTo(models.Color, {
      foreignKey: "color_id",
      as: "color",
    });

    Product.belongsTo(models.Brand, {
      foreignKey: "brand_id",
      as: "brand",
    });

    Product.belongsTo(models.Model, {
      foreignKey: "model_id",
      as: "model",
    });

    Product.belongsTo(models.Box, {
      foreignKey: "box_id",
      as: "box",
    });

    Product.belongsTo(models.Dial, {
      foreignKey: "dial_id",
      as: "dial",
    });

    Product.belongsTo(models.Movement, {
      foreignKey: "movement_id",
      as: "movement",
    });

    Product.belongsTo(models.Band, {
      foreignKey: "band_id",
      as: "band",
    });

    Product.belongsTo(models.WaterResistance, {
      foreignKey: "water_resistance_id",
      as: "waterResistance",
    });

    Product.hasMany(models.CartDetail, {
      foreignKey: "product_id",
      as: "cartDetails",
    });

    Product.hasMany(models.ProductImage, { 
      as: "images",
    });

  };

  return Product;
};
