// auth model// auth model

import { model, Schema } from "mongoose";
import { IUser, UserRole } from "./auth.interface";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false, // Prevents the password from being returned by default
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: Object.values(UserRole), // Use the enum from types
    default: UserRole.STUDENT,
  },
  otp: {
    type: String,
    select: false,
  },
  otpExpiry: {
    type: Date,
    select: false,
  },
});

// hash the pass
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash the password
  if (typeof this.password === "string") {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export const User = model<IUser>("User", UserSchema);
