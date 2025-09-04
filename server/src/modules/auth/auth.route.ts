// auth routes

import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/register", AuthController.CreateUser);

router.post("/verifyOtp", AuthController.VerifyOtp);

router.post("/login", AuthController.LoginUser);

router.get("/users", AuthController.GetAllUsers);

router.get("/me", AuthController.getMe);

export const AuthRoutes = router;
