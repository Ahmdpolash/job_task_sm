import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { QuestionRoutes } from "../modules/questions/questions.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
