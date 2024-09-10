module.exports = function (sequelize, DataTypes) {
  let alias = "WaterResistance";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING(255),
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
    tableName: "water_resistance",
    timestamps: true,
    underscored: true,
  };

  let WaterResistance = sequelize.define(alias, cols, config);

  WaterResistance.associate = function (models) {
    WaterResistance.hasMany(models.Product, {
      foreignKey: "water_resistance_id",
      as: "products",
    });
  };

  return WaterResistance;
};
