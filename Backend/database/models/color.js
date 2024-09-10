module.exports = function (sequelize, DataTypes) {
  let alias = "Color";

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
    tableName: "color",
    timestamps: true,
    underscored: true,
  };

  let Color = sequelize.define(alias, cols, config);

  Color.associate = function (models) {
    Color.hasMany(models.Product, {
      foreignKey: "color_id",
      as: "products",
    });
  };

  return Color;
};
