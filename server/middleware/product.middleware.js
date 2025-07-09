import Product from "../models/product.model.js";

export const checkProductExists = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};
