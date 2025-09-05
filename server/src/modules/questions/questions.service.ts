// questions service

import AppError from "../../errors/AppError";
import { Question } from "./questions.model";
import httpStatus from "http-status";

const createQuestion = async (payload: any) => {
  // Auto-calculate step based on level
  if (payload.level === "A1" || payload.level === "A2") {
    payload.step = 1;
  } else if (payload.level === "B1" || payload.level === "B2") {
    payload.step = 2;
  } else if (payload.level === "C1" || payload.level === "C2") {
    payload.step = 3;
  }

  const question = await Question.create(payload);
  return question;
};

// get questions

const getAllQuestions = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build filter object
  const filter: any = {};

  if (query.level) filter.level = query.level;
  if (query.step) filter.step = Number(query.step);
  if (query.competency)
    filter.competency = { $regex: query.competency, $options: "i" };

  // Get questions
  const questions = await Question.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  // Count total
  const total = await Question.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  return {
    data: questions,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

// get single question
const getSingleQuestion = async (id: string) => {
  const question = await Question.findById(id);
  if (!question) {
    throw new AppError("Question not found", httpStatus.NOT_FOUND);
  }
  return question;
};

// update
const updateQuestion = async (id: string, payload: any) => {
  // find quesiton
  const quesiton = await Question.findById(id);
  if (!quesiton) {
    throw new AppError("Question not found", httpStatus.NOT_FOUND);
  }

  // update
  const updatedQuestion = await Question.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedQuestion;
};

// delete
const deleteQuestion = async (id: string) => {
  const question = await Question.findById(id);
  if (!question) {
    throw new AppError("Question not found", httpStatus.NOT_FOUND);
  }

  //dlt
  await Question.findByIdAndDelete(id);
};

// get random questions for exam by step

const getQuestionsByStep = async (step: number) => {
  const questions = await Question.find({ step }).sort({ createdAt: 1 });

  if (questions.length === 0) {
    throw new AppError(
      `No questions found for step ${step}`,
      httpStatus.NOT_FOUND
    );
  }

  return questions;
};

export const QuestionServices = {
  createQuestion,
  getAllQuestions,
  getQuestionsByStep,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
};
