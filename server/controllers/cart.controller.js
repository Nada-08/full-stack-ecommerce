import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    res
      .status(200)
      .json({ success: true, cart: cart || { user: req.user._id, items: [] } });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || typeof productId !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid productId" });
    }

    if (quantity <= 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Quantity must be greater than zero",
        });
    }

    console.log("Pushing to cart:", productId, quantity);
    // cart.items.push({ product: productId, quantity });
    
    const product = await Product.findById(productId);
    if (!product) {
        return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    console.log("Product: ", product);

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    if (!cart.items) {
      cart.items = [];
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Cart updated", cart });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    return res
      .status(200)
      .json({ success: true, message: "Item removed", cart });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ success: true, message: "Cart cleared", cart });
  } catch (error) {
    next(error);
  }
};
