import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

import DBConnection from "./DB/connection.js";
import userRouter from "./modules/user/user.controller.js";
import authRouter from "./modules/auth/auth.controller.js";
import messageRouter from "./modules/messages/message.controller.js";

const bootstrap = async (app) => {
  // 1. Security Middlewares
  app.use(cors());
  app.use(helmet());

  // Rate Limiter
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    limit: 100, // 100 request لكل IP
    message: { message: "Too many requests, please try again later." },
  });
  app.use(limiter);

  // 2. Parsing JSON Body
  app.use(express.json());

  // 3. Connect to Database
  await DBConnection();

  // 4. Master Routes
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/messages", messageRouter);

  // 5. Test Route
  app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome to Saraha App API!" });
  });

  // 6. Global Error Handler
  app.use((err, req, res, next) => {
    return res.status(err.cause || 500).json({
      message: err.message || "Internal Server Error",
    });
  });
};

export default bootstrap;