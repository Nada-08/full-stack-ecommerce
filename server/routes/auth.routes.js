import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { registerUser, login } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", registerUser);
authRouter.post("/login", login);

export default authRouter;