// exam routes

import { Router } from "express";
import {
  submitExamController,
  getUserExamResultsController,
} from "./exam.controller";

const router = Router();

router.post("/submit", submitExamController);
router.get("/user/:userId", getUserExamResultsController);

export const ExamRoutes = router;
