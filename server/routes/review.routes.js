import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { addReview, getAllReviews, updateReview, deleteReview } from "../controllers/review.controller.js";
import { checkProductExists } from "../middleware/product.middleware.js";
import { checkReviewExists } from "../middleware/review.middleware.js";

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(checkProductExists);

reviewRouter.get("/", getAllReviews);
reviewRouter.post("/", authorize, addReview);
reviewRouter.put("/:reviewId", authorize, checkReviewExists, updateReview);
reviewRouter.delete("/:reviewId", authorize, checkReviewExists, deleteReview);

export default reviewRouter;
