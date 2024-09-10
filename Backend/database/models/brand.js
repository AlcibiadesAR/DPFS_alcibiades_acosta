module.exports = function (sequelize, DataTypes) {
  let alias = "Brand";

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
    tableName: "brand",
    timestamps: true,
    underscored: true,
  };

  let Brand = sequelize.define(alias, cols, config);

  Brand.associate = function (models) {
    Brand.hasMany(models.Product, {
      foreignKey: "brand_id",
      as: "products",
    });
  };

  return Brand;
};
