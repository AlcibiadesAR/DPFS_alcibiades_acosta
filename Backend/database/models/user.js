module.exports = function (sequelize, DataTypes) {
  let alias = "User";

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Administrador", "Registrado"),
      allowNull: false,
      defaultValue: "Registrado",
    },
    phone: {
      type: DataTypes.STRING(15),
    },
    url: {  
      type: DataTypes.STRING(255), 
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
    tableName: "user",
    timestamps: true,
    underscored: true,
  };

  let User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.hasMany(models.Cart, {
      foreignKey: "user_id",
      as: "carts",
    });
  };

  return User;
};
