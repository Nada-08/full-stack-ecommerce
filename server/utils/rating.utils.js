import Product from "../models/product.model.js";
import Review from "../models/review.model.js";

export const calculateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });
  const numReviews = reviews.length;

  const avgRating =
    numReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / numReviews
      : 0;

  await Product.findByIdAndUpdate(productId, {
    numReviews,
    rating: avgRating,
  });
};
