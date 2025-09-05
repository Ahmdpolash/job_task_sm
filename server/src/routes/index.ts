import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { QuestionRoutes } from "../modules/questions/questions.route";
import { ExamRoutes } from "../modules/exam/exam.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/question",
    route: QuestionRoutes,
  },
  {
    path: "/exam",
    route: ExamRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
