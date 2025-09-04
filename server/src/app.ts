import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound } from "./middleware/notFound";
import router from "./routes";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

// routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hey, Im working fine :)");
});

//middleware

app.use(globalErrorHandler);
app.use(notFound);

export default app;
