module.exports = function (sequelize, DataTypes) {
  let alias = "Model";

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
    tableName: "model",
    timestamps: true,
    underscored: true,
  };

  let Model = sequelize.define(alias, cols, config);

  Model.associate = function (models) {
    Model.hasMany(models.Product, {
      foreignKey: "model_id",
      as: "products",
    });
  };

  return Model;
};
