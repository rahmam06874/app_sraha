import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fname: { type: String, required: true, trim: true },
    lname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
    gender: { type: String, enum: ["male", "female"] },
    age: { type: Number },
    address: { type: String },
    provider: { type: String, enum: ["system", "google"], default: "system" },
    coverImage: { type: String, default: "" },
    confirmEmail: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual property for fullName
userSchema.virtual("fullName").get(function () {
  return `${this.fname} ${this.lname}`;
});

const userModel = model("User", userSchema);
export default userModel;