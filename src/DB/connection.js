import mongoose from "mongoose";

const DBConnection = async () => {
  try {
    const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/saraha-app";
    await mongoose.connect(url);
    console.log("DB connected successfully...");
  } catch (error) {
    console.log("DB connection error:", error);
  }
};

export default DBConnection;