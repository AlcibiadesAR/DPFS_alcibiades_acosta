module.exports = function (sequelize, DataTypes) {
  let alias = "CartDetail";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
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
    tableName: "cart_detail",
    timestamps: true,
    underscored: true,
  };

  let CartDetail = sequelize.define(alias, cols, config);

  CartDetail.associate = function (models) {
    CartDetail.belongsTo(models.Cart, {
      foreignKey: "cart_id",
      as: "cart",
    });

    CartDetail.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  };

  return CartDetail;
};
