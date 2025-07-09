import Review from "../models/review.model.js";

export const checkReviewExists = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    req.review = review;
    next();
  } catch (error) {
    next(error);
  }
};
