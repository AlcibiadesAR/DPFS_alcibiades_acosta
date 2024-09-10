module.exports = function (sequelize, DataTypes) {
    let alias = "ProductImage";

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'product',
                key: 'id'
            }
        },
        image_type: {
            type: DataTypes.ENUM('product'),
            allowNull: false,
        },
        url: {
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
        tableName: "product_image",
        timestamps: true,
        underscored: true,
    };

    let ProductImage = sequelize.define(alias, cols, config);

    ProductImage.associate = function (models) {
        ProductImage.belongsTo(models.Product, {
            foreignKey: "product_id",
            as: "product",
        });
    };

    return ProductImage;
};
