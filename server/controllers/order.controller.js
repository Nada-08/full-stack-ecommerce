import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const getOrderHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const orders =
      (await Order.find({ user: userId }).populate("items.product")) || [];

    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orderItems = req.body.items;
    const paymentMethod = req.body.paymentMethod;
    const shippingAddress = req.body.shippingAddress;

    if (!orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No items provided for the order" });
    }

    let totalAmount = 0;
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      totalAmount += item.quantity * product.price;
    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      paymentMethod,
      paymentStatus: "Pending",
      status: "Pending",
      totalAmount,
      shippingAddress,
    });

    res
      .status(201)
      .json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const userId = req.user._id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (order.status !== "Pending") {
      return res
        .status(400)
        .json({ success: false, message: "Cannot cancel this order" });
    }

    order.status = "Cancelled";
    await order.save();

    return res
      .status(200)
      .json({ success: true, message: "Order cancelled", order });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.userId) {
      filter.user = req.query.userId;
    }

    const orders = await Order.find(filter).populate("items.proudct user");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const status = req.body.status;
    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    if (!allowedStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    order.status = status;
    await order.save();

    res.send(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderPaymentStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const paymentStatus = req.body.paymentStatus;
    const allowedStatuses = ["Pending", "Paid", "Failed"];
    if (!allowedStatuses.includes(paymentStatus)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment status" });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order payment status updated successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.param.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await Order.findByIdAndDelete(orderId);

    return res
      .status(200)
      .json({ success: true, messagea: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
