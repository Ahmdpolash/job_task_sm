import { model, Schema } from "mongoose";

type Answer = {
  questionId: string;
  selectedAnswer: "A" | "B" | "C" | "D";
  timeSpent: number; // seconds
};

const ExamResultSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  step: { type: Number, required: true },
  level: { type: String, enum: ["A1","A2","B1","B2","C1","C2"], required: true },
  score: { type: Number, required: true },
  passed: { type: Boolean, default: false },
  answers: { type: [Object], default: [] as Answer[] },
  completedAt: { type: Date, default: Date.now }
});

export const ExamResult = model("ExamResult", ExamResultSchema);
