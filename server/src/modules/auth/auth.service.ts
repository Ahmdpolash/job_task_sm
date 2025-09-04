// auth service

import AppError from "../../errors/AppError";
import { IUser } from "./auth.interface";
import { User } from "./auth.model";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";
import { jwtHelper } from "../../helper/jwtHelper";
import { sendEmail } from "../../utils/sendMail";

// create user acc
const CreateUser = async (payload: IUser) => {
  // checking if user already exists
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError("This user already exists", httpStatus.CONFLICT);
  }

  //generate otp

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

  // store user info in db

  const newUser = await User.create({
    ...payload,
    otp,
    otpExpiry,
    isVerified: false,
  });

  // Send OTP email
  await sendEmail({
    to: payload.email,
    subject: "Verify your DigiCompetence Account",
    templateName: "activation",
    replacements: { name: payload.name, activationCode: otp },
  });

  return newUser;
};

// verify email
const verifyOtp = async (email: string, otp: string) => {
  const user = await User.findOne({ email: email }).select("+otp +otpExpiry");
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }

  // check user isVerified or not
  if (user.isEmailVerified) {
    throw new AppError("User already verified", httpStatus.BAD_REQUEST);
  }

  // check the otp and expiry
  if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
    throw new AppError("Invalid or expired OTP", httpStatus.BAD_REQUEST);
  }

  // mark user as verified and remove the otp
  user.isEmailVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  return { message: "Account verified successfully" };
};

// user login api
const loginUser = async (email: string, password: string) => {
  // validate email and password
  if (!email || !password) {
    throw new AppError(
      "Email and password are required",
      httpStatus.BAD_REQUEST
    );
  }

  // find user by email
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("User not found", httpStatus.UNAUTHORIZED);
  }

  // check if password matches
  const isPasswordMatch = await bcrypt.compare(password, user.password!);
  if (!isPasswordMatch) {
    throw new AppError("Invalid password", httpStatus.UNAUTHORIZED);
  }

  // generate jwt token

  const tokenPayload = {
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
  };

  const accessToken = jwtHelper.generateToken(
    tokenPayload,
    config.jwt.secret as string,
    config.jwt.expiresIn as string
  );

  return {
    accessToken,
    user: {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    },
  };
};

// ge all users
const getAllUsers = async () => {
  const users = await User.find().select("-password -otp -otpExpiry");
  return users;
};

// get me

const getMe = async (userId: string) => {
  const user = await User.findById(userId).select("-password -otp -otpExpiry");
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }
  return user;
};

export const AuthServices = {
  CreateUser,
  verifyOtp,
  loginUser,
  getMe,
  getAllUsers,
};
