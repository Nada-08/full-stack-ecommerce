import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, getRecentProducts, updateProduct } from "../controllers/product.controller.js";

const productRouter = express.Router();

// public routes
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/recent/:count", getRecentProducts);

// Admin routes
productRouter.post("/", authorize, isAdmin, createProduct);
productRouter.put("/:id", authorize, isAdmin, updateProduct);
productRouter.delete("/:id", authorize, isAdmin, deleteProduct);

export default productRouter;
