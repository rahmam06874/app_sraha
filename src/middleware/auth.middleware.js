import jwt from "jsonwebtoken";
import userModel from "../DB/models/user.model.js";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Token is required" });
    }

    // فك تشفير الـ Token بـ "sarahaSecretKey"
    const decoded = jwt.verify(
      authorization,
      process.env.JWT_SECRET || "sarahaSecretKey"
    );

    if (!decoded?.id) {
      return res.status(400).json({ message: "Invalid token payload" });
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({ message: "Auth Error", error: error.message });
  }
};