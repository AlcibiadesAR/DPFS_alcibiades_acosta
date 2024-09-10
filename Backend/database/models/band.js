module.exports = function (sequelize, DataTypes) {
  let alias = "Band";

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
    tableName: "band",
    timestamps: true,
    underscored: true,
  };

  let Band = sequelize.define(alias, cols, config);

  Band.associate = function (models) {
    Band.hasMany(models.Product, {
      foreignKey: "band_id",
      as: "products",
    });
  };

  return Band;
};
