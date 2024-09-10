module.exports = function (sequelize, DataTypes) {
  let alias = "Dial";

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
    tableName: "dial",
    timestamps: true,
    underscored: true,
  };

  let Dial = sequelize.define(alias, cols, config);

  Dial.associate = function (models) {
    Dial.hasMany(models.Product, {
      foreignKey: "dial_id",
      as: "products",
    });
  };

  return Dial;
};
