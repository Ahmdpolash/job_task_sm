// auth controller
import httpStatus from "http-status";

import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";

// CREATE ACCOUNT
const CreateUser = catchAsync(async (req, res) => {
  const result = await AuthServices.CreateUser(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Please check your email to verify your account",
    data: result,
  });
});

// VERIFY OTP
const VerifyOtp = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  const result = await AuthServices.verifyOtp(email, otp);
  res.status(httpStatus.OK).json({
    success: true,
    message: result.message,
  });
});

// login

const LoginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthServices.loginUser(email, password);
  const { accessToken, user, refreshToken } = result;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // set to true in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      user,
    },
  });
});

// get all users
const GetAllUsers = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllUsers();
  res.status(httpStatus.OK).json({
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

// get me
const getMe = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await AuthServices.getMe(userId);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User profile fetched successfully",
    data: result,
  });
});

// logout
const logOut = async (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.status(httpStatus.OK).json({
    success: true,
    message: "User logged out successfully",
  });
};

// get total user count and total question count
const GetTotalCounts = catchAsync(async (req, res) => {
  const { totalUsers, totalQuestion } = await AuthServices.GetTotalCounts();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Total counts fetched successfully",
    data: {
      users: totalUsers,
      questions: totalQuestion,
    },
  });
});

export const AuthController = {
  CreateUser,
  GetTotalCounts,
  VerifyOtp,
  LoginUser,
  GetAllUsers,
  getMe,
  logOut,
};
