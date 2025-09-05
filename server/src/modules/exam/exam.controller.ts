// exam controller

import { Request, Response } from "express";
import httpStatus from "http-status";
import { getUserExamResults, submitExam } from "./exam.service";

export const submitExamController = async (req: Request, res: Response) => {
  try {
    const { userId, step, answers, score } = req.body;

    const result = await submitExam({ userId, step, answers, score });

    res.status(httpStatus.OK).json({
      success: true,
      message: `Step ${step} submitted successfully`,
      data: result,
    });
  } catch (err: any) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ success: false, message: err.message });
  }
};

export const getUserExamResultsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const results = await getUserExamResults(userId);

    res.status(httpStatus.OK).json({
      success: true,
      message: "User exam results retrieved successfully",
      data: results,
    });
  } catch (err: any) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ success: false, message: err.message });
  }
};

export const getUserLevelAndExamCountController = async (
  req: Request,
  res: Response
) => {};
