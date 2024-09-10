module.exports = function (sequelize, DataTypes) {
  let alias = "Movement";

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
    tableName: "movement",
    timestamps: true,
    underscored: true,
  };

  let Movement = sequelize.define(alias, cols, config);

  Movement.associate = function (models) {
    Movement.hasMany(models.Product, {
      foreignKey: "movement_id",
      as: "products",
    });
  };

  return Movement;
};
