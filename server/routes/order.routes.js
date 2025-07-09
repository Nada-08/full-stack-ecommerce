import express from "express";
import { authorize } from "../middleware//auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";
import {
  cancelOrder,
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrderHistory,
  updateOrderPaymentStatus,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const orderRoutes = express.Router();

orderRoutes.use(authorize);

// User routes
orderRoutes.get("/", getOrderHistory);
orderRoutes.get("/:id", getOrderById); // for admin and user
orderRoutes.post("/", createOrder);
orderRoutes.delete("/:id", cancelOrder);

// Admin routes
orderRoutes.get("/admin/all", isAdmin, getAllOrders); // can be filtered using userId
orderRoutes.put("/admin/:id/status", isAdmin, updateOrderStatus);
orderRoutes.put("/admin/:id/paymentStatus", isAdmin, updateOrderPaymentStatus);
orderRoutes.delete("/admin/:id", isAdmin, deleteOrder);

export default orderRoutes;
