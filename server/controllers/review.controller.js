import Product from "../models/product.model.js";
import Review from "../models/review.model.js";
import { calculateProductRating } from "../utils/rating.utils.js";

export const getAllReviews = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name"
    );

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.user._id;
    const { rating, comment } = req.body;

    const existingReview = await Review.findOne({
      product: productId,
      user: userId,
    });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You've already reviewed this product",
      });
    }

    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    await calculateProductRating(productId);

    return res
      .status(201)
      .json({ success: true, message: "Review created successfully", review });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const review = req.review;

    const userId = req.user._id;
    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const { rating, comment } = req.body;

    if (rating !== undefined) {
      review.rating = rating;
    }

    if (comment !== undefined) {
      review.comment = comment;
    }

    const updatedReview = await review.save();

    await calculateProductRating(productId);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;
    const review = req.review;
    const userId = req.user._id;

    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Review.findByIdAndDelete(reviewId);

    await calculateProductRating(productId);

    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully"});
  } catch (error) {
    next(error);
  }
};
