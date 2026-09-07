import userModel from "../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/email.js";

// ================= Signup Service =================
export const signupService = async (req, res, next) => {
  const { fname, lname, email, password, gender, age } = req.body;

  const isExist = await userModel.findOne({ email });
  if (isExist) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await userModel.create({
    fname,
    lname,
    email,
    password: hashedPassword,
    gender,
    age,
  });

  return res.status(201).json({ message: "User registered successfully", user });
};

// ================= Login Service =================
export const loginService = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Invalid email or password" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "sarahaSecretKey",
    { expiresIn: "1h" }
  );

  return res.status(200).json({ message: "Logged in successfully", token });
};

// ================= Forget Password Service =================
export const forgetPasswordService = async (req, res, next) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  const resetToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "sarahaSecretKey",
    { expiresIn: "10m" }
  );

  const isSent = await sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h1>Reset Your Password</h1><p>Your reset token is: <b>${resetToken}</b></p>`,
  });

  if (!isSent) {
    return res.status(500).json({ message: "Failed to send email" });
  }

  return res.status(200).json({ message: "Reset token sent to email successfully" });
};

// ================= Reset Password Service =================
export const resetPasswordService = async (req, res, next) => {
  const { authorization } = req.headers;
  const { newPassword } = req.body;

  if (!authorization) {
    return res.status(400).json({ message: "Token is required" });
  }

  const decoded = jwt.verify(
    authorization,
    process.env.JWT_SECRET || "sarahaSecretKey"
  );

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  await userModel.findByIdAndUpdate(decoded.id, { password: hashedPassword });

  return res.status(200).json({ message: "Password updated successfully" });
};