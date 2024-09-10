module.exports = function (sequelize, DataTypes) {
  let alias = "Cart";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    fecha_de_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
    tableName: "cart",
    timestamps: true,
    underscored: true,
  };

  let Cart = sequelize.define(alias, cols, config);

  Cart.associate = function (models) {
    Cart.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    
    Cart.hasMany(models.CartDetail, {
      foreignKey: "cart_id",
      as: "cartDetails",
    });
  };

  return Cart;
};
