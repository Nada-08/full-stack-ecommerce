import express from "express";
import cors from "cors";
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";
import authRouter from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import reviewRouter from "./routes/review.routes.js";

const app = express();

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/products/:productId/reviews", reviewRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce API!");
});

export default app;
