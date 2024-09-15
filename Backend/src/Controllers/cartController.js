const DB = require("../../database/models");
const Cart = DB.Cart;
const CartDetail = DB.CartDetail;
const Product = DB.Product;
const ProductImage = DB.ProductImage;

const CartController = {
  addProductToCart: async (req, res) => {
    const productId = req.body.productId;
    const userId = req.user.id;

    try {
      let cart = await Cart.findOne({ where: { user_id: userId } });

      if (!cart) {
        cart = await Cart.create({ user_id: userId });
      }

      const product = await Product.findByPk(productId);

      const existingDetail = await CartDetail.findOne({
        where: { cart_id: cart.id, product_id: productId },
      });

      if (existingDetail) {
        await existingDetail.update({
          quantity: existingDetail.quantity + (req.body.quantity || 1),
        });
      } else {
        await CartDetail.create({
          cart_id: cart.id,
          product_id: productId,
          quantity: req.body.quantity || 1,
          unit_price: product.price,
        });
      }

      const totalItemsInCart = await CartDetail.sum('quantity', { where: { cart_id: cart.id } });

      res.json({ success: true, totalItemsInCart, message: "Producto agregado al carrito" });
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      res.status(500).json({
        success: false,
        message: "Error al agregar producto al carrito.",
      });
    }
  },

  getCart: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(400).send("No se encontró el usuario.");
      }

      const userId = req.user.id;
      const cart = await Cart.findOne({
        where: { user_id: userId },
        include: [
          {
            model: CartDetail,
            as: "cartDetails",
            include: [
              {
                model: Product,
                as: "product",
                include: [
                  {
                    model: ProductImage,
                    as: "images",
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!cart || !cart.cartDetails) {
        return res.status(404).send("Carrito no encontrado o vacío.");
      }

      const total = cart.cartDetails.reduce((sum, detail) => {
        const discount = detail.product.discount_percentage;
        const discountAmount = (detail.unit_price * discount) / 100;
        const subtotal = (detail.unit_price - discountAmount) * detail.quantity;
        return sum + subtotal;
      }, 0);

      const calculateDiscount = () => {
        const discountPercentage = 10;
        return total * (discountPercentage / 100);
      };

      const discount = calculateDiscount();
      const totalWithDiscount = total - discount;

      res.render("cart/pageCart", {
        cart,
        total,
        discount,
        totalWithDiscount,
        title: "Tu Carrito",
      });
    } catch (error) {
      console.error("Error en getCart:", error);
      res.status(500).send("Error al obtener el carrito");
    }
  },

  removeProductFromCart: async (req, res) => {
    const cartDetailId = req.params.id;

    try {
      const result = await CartDetail.destroy({ where: { id: cartDetailId } });

      const cart = await Cart.findOne({ where: { user_id: req.user.id } });
      const totalItemsInCart = cart ? await CartDetail.sum('quantity', { where: { cart_id: cart.id } }) : 0;

      if (result) {
        res.json({ success: true, totalItemsInCart, message: "Producto eliminado del carrito" });
      } else {
        res.status(404).json({
          success: false,
          message: "Producto no encontrado en el carrito",
        });
      }
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
      res.status(500).json({
        success: false,
        message: "Error al eliminar producto del carrito",
      });
    }
  },

  vaciarCarrito: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const cart = await Cart.findOne({ where: { user_id: userId } });
      
      if (!cart) {
        return res.json({ success: true, totalItemsInCart: 0, message: "No se encontró el carrito del usuario." });
      }
    
      await CartDetail.destroy({ where: { cart_id: cart.id } });
      
      res.json({ success: true, totalItemsInCart: 0, message: "Carrito vacío exitosamente." });
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
      res.status(500).json({ success: false, message: "Error al vaciar el carrito." });
    }
  },

  getCartCount: async (req, res) => {
    try {
      const userId = req.user.id;
      const cart = await Cart.findOne({ where: { user_id: userId } });
      const totalItemsInCart = cart ? await CartDetail.sum('quantity', { where: { cart_id: cart.id } }) : 0;
      res.json({ success: true, totalItemsInCart });
    } catch (error) {
      console.error("Error al obtener el conteo del carrito:", error);
      res.status(500).json({ success: false, message: "Error al obtener el conteo del carrito." });
    }
  },
};

module.exports = CartController;