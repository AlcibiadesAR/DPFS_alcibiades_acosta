// src/database/models/category.js
module.exports = function (sequelize, DataTypes) {
  let alias = "Category";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
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
    tableName: "category",
    timestamps: true,
    underscored: true,
  };

  let Category = sequelize.define(alias, cols, config);

  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      foreignKey: "category_id",
      as: "products",
    });
  };

  return Category;
};
