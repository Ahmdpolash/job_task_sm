// auth routes

import { Router } from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/register", AuthController.CreateUser);

router.post("/verifyOtp", AuthController.VerifyOtp);

router.post("/login", AuthController.LoginUser);

router.get("/users", AuthController.GetAllUsers);

router.get("/me", auth(), AuthController.getMe);

router.post("/logout", AuthController.logOut);

router.get("/totalCounts", AuthController.GetTotalCounts);

export const AuthRoutes = router;
