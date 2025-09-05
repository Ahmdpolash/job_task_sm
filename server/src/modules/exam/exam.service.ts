// exam service
import { ExamResult } from "./exam.model";
import { User } from "../auth/auth.model";

interface SubmitExamPayload {
  userId: string;
  step: number;
  answers: { questionId: string; selectedAnswer: "A"|"B"|"C"|"D"; timeSpent: number }[];
  score: number;
}

export const submitExam = async (payload: SubmitExamPayload) => {
  const user = await User.findById(payload.userId);
  if (!user) throw new Error("User not found");

  // Determine level & pass/fail based on step rules
  let level = user.currentLevel;
  let passed = false;

  if (payload.step === 1) {
    if (payload.score < 25) passed = false; 
    else if (payload.score < 50) level = "A1", passed = true;
    else level = "A2", passed = true;
  } else if (payload.step === 2) {
    if (payload.score < 25) level = user.currentLevel; 
    else if (payload.score < 50) level = "B1";
    else level = "B2";
    passed = payload.score >= 25;
  } else if (payload.step === 3) {
    if (payload.score < 25) level = user.currentLevel;
    else if (payload.score < 50) level = "C1";
    else level = "C2";
    passed = payload.score >= 25;
  }

  // Save exam result
  const examResult = await ExamResult.create({
    userId: payload.userId,
    step: payload.step,
    level,
    score: payload.score,
    passed,
    answers: payload.answers
  });

  // Update user currentLevel & completedLevels
  user.currentLevel = level;
  if (passed) user.completedLevels = Math.max(user.completedLevels ?? 0, payload.step);
  user.totalExams = (user.totalExams || 0) + 1;
  await user.save();

  return examResult;
};

export const getUserExamResults = async (userId: string) => {
  return ExamResult.find({ userId }).sort({ step: 1 });
};
