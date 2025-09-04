import mongoose, { Schema } from "mongoose";

const examAnswerSchema = new Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    selectedAnswer: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const examSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    step: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],
    answers: [examAnswerSchema],

    score: {
      type: Number,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      default: 44,
    },
    correctAnswers: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["in-progress", "completed", "expired"],
      default: "in-progress",
    },
    levelAchieved: {
      type: String,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
    },
    canProceedToNext: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Exam = mongoose.model("Exam", examSchema);
