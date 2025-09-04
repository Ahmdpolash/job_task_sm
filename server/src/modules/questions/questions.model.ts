// questions model

import { Schema, model } from "mongoose";
import { IQuestion } from "./questions.interface";

const questionSchema = new Schema<IQuestion>(
  {
    competency: {
      type: String,
      required: [true, "Competency is required"],
      trim: true,
    },
    level: {
      type: String,
      required: [true, "Level is required"],
      enum: {
        values: ["A1", "A2", "B1", "B2", "C1", "C2"],
        message: "Level must be one of A1, A2, B1, B2, C1, C2",
      },
    },
    step: {
      type: Number,
      required: [true, "Step is required"],
      enum: {
        values: [1, 2, 3],
        message: "Step must be 1, 2, or 3",
      },
    },
    questionText: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
      minlength: [10, "Question text must be at least 10 characters"],
    },
    options: {
      A: {
        type: String,
        required: [true, "Option A is required"],
        trim: true,
      },
      B: {
        type: String,
        required: [true, "Option B is required"],
        trim: true,
      },
      C: {
        type: String,
        required: [true, "Option C is required"],
        trim: true,
      },
      D: {
        type: String,
        required: [true, "Option D is required"],
        trim: true,
      },
    },
    correctAnswer: {
      type: String,
      required: [true, "Correct answer is required"],
      enum: {
        values: ["A", "B", "C", "D"],
        message: "Correct answer must be A, B, C, or D",
      },
    },
    difficulty: {
      type: Number,
      required: [true, "Difficulty is required"],
      min: [1, "Difficulty must be at least 1"],
      max: [5, "Difficulty cannot exceed 5"],
    },
    explanation: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "Created by is required"],
    // },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
questionSchema.index({ competency: 1, level: 1 });
questionSchema.index({ step: 1 });
questionSchema.index({ isActive: 1 });
questionSchema.index({ createdBy: 1 });

// Pre-save middleware to auto-calculate step based on level
questionSchema.pre("save", function (next) {
  if (this.level === "A1" || this.level === "A2") {
    this.step = 1;
  } else if (this.level === "B1" || this.level === "B2") {
    this.step = 2;
  } else if (this.level === "C1" || this.level === "C2") {
    this.step = 3;
  }
  next();
});

export const Question = model<IQuestion>("Question", questionSchema);
