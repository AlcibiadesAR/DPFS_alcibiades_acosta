module.exports = function (sequelize, DataTypes) {
  let alias = "Box";

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
    tableName: "box",
    timestamps: true,
    underscored: true,
  };

  let Box = sequelize.define(alias, cols, config);

  Box.associate = function (models) {
    Box.hasMany(models.Product, {
      foreignKey: "box_id",
      as: "products",
    });
  };

  return Box;
};
