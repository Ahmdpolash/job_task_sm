// questions controller
import { Request, Response } from "express";
import httpStatus from "http-status";

import { QuestionServices } from "./questions.service";
import catchAsync from "../../utils/catchAsync";

// Create a new question
const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionServices.createQuestion(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Question created successfully",
    data: result,
  });
});

// get all questions
const getAllQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionServices.getAllQuestions(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Questions retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

// get single
const getSingleQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await QuestionServices.getSingleQuestion(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Question retrieved successfully",
    data: result,
  });
});

// update question
const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await QuestionServices.updateQuestion(id, req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Question updated successfully",
    data: result,
  });
});

// Delete question
const deleteQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await QuestionServices.deleteQuestion(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Question deleted successfully",
    data: null,
  });
});

// get random
const getQuestionsByStep = catchAsync(async (req: Request, res: Response) => {
  const { step } = req.params;
  const result = await QuestionServices.getQuestionsByStep(Number(step));

  res.status(httpStatus.OK).json({
    success: true,
    message: `Questions for step ${step} retrieved successfully`,
    data: result,
  });
});

export const QuestionControllers = {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByStep,
};
