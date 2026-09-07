import userModel from "../../DB/models/user.model.js";

// 1. Get All Users (لـ Admin)
export const getAllUsersService = async (req, res, next) => {
  const users = await userModel.find().select("-password");
  return res.status(200).json({ message: "Users retrieved successfully", users });
};

// 2. Update User Profile
export const updateUserService = async (req, res, next) => {
  const { userId } = req.params; // أو من req.user بعد إضافة الـ Auth middleware
  const { fname, lname, age, address, gender } = req.body;

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { fname, lname, age, address, gender },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User updated successfully", user: updatedUser });
};

// 3. Delete User Profile
export const deleteUserService = async (req, res, next) => {
  const { userId } = req.params;

  const deletedUser = await userModel.findByIdAndDelete(userId);

  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User deleted successfully" });
};