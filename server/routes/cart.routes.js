import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  addToCart,
  clearCart,
  getCart,
  getCartItem,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.use(authorize);

cartRouter.get("/", getCart);
cartRouter.get("/:id", getCartItem);
cartRouter.put("/", updateCartItem);
cartRouter.post("/", addToCart);
cartRouter.delete("/:productId", removeFromCart);
cartRouter.delete("/", clearCart);

export default cartRouter;
