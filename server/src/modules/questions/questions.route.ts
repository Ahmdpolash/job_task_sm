// questions routes

import { Router } from "express";
import { QuestionControllers } from "./questions.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../auth/auth.interface";

const router = Router();

router.post("/", auth(UserRole.ADMIN), QuestionControllers.createQuestion);

router.get("/", QuestionControllers.getAllQuestions);

router.get("/:id", QuestionControllers.getSingleQuestion);

router.put("/:id", auth(UserRole.ADMIN), QuestionControllers.updateQuestion);

router.delete("/:id", auth(UserRole.ADMIN), QuestionControllers.deleteQuestion);

router.get("/step/:step", QuestionControllers.getQuestionsByStep);

export const QuestionRoutes = router;
