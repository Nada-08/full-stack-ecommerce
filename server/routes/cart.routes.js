import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.use(authorize);

cartRouter.get("/", getCart);
cartRouter.post("/", addToCart);
cartRouter.delete("/:productId", removeFromCart);
cartRouter.delete("/", clearCart);

export default cartRouter;
