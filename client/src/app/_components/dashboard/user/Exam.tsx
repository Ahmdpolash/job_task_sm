"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetQuestionByStepQuery } from "@/redux/features/question/questionApi";
import { useSubmitExamMutation } from "@/redux/features/exam/examApi";
import { useGetMeQuery } from "@/redux/features/auth/authApi";

type Question = {
  _id: string;
  competency: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  step: number;
  questionText: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: "A" | "B" | "C" | "D";
};

type Answer = {
  questionId: string;
  selectedAnswer: "A" | "B" | "C" | "D" | null;
  timeSpent: number;
};

export default function ExamPage() {
  const { data: userData } = useGetMeQuery({});
  const user = userData?.data;

  const router = useRouter();
  const step = Number(useSearchParams().get("step") || "1");

  const { data: apiResponse, isLoading } = useGetQuestionByStepQuery(step);
  const questions: Question[] = Array.isArray((apiResponse as any)?.data)
    ? (apiResponse as any).data
    : [];

  console.log("Fetched questions:", questions);


  //stateeeeeeeee
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<
    "A" | "B" | "C" | "D" | null
  >(null);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);
  const [submitExam] = useSubmitExamMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  // Timer countdown
  useEffect(() => {
    if (!currentQuestion || isFinished) return;

    if (timeLeft <= 0) {
      handleNextQuestion(null); // auto next if no option selected
      return;
    }

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, currentQuestion, isFinished]);

  // Prevent accidental page leave
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure? Your progress will be lost.";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Select an option
  const handleOptionSelect = (option: "A" | "B" | "C" | "D") => {
    if (!currentQuestion || selectedOption) return;

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: {
        questionId: currentQuestion._id,
        selectedAnswer: option,
        timeSpent,
      },
    }));

    setSelectedOption(option);
  };

  // Move to next question
  const handleNextQuestion = (option: "A" | "B" | "C" | "D" | null) => {
    if (currentQuestion && !selectedOption) {
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion._id]: {
          questionId: currentQuestion._id,
          selectedAnswer: option,
          timeSpent,
        },
      }));
    }

    if (isLastQuestion) {
      setIsFinished(true);
      handleSubmitExam();
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(
      answers[questions[currentIndex + 1]?._id]?.selectedAnswer || null
    );
    setQuestionStartTime(Date.now());
    setTimeLeft(30);
  };

  // Previous question
  const handlePreviousQuestion = () => {
    if (currentIndex === 0) return;

    setCurrentIndex((prev) => prev - 1);
    setSelectedOption(
      answers[questions[currentIndex - 1]?._id]?.selectedAnswer || null
    );
    setQuestionStartTime(Date.now());
    setTimeLeft(30);
  };

  // Submit exam answers to backend
  const handleSubmitExam = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = {
      userId: user?._id, // replace with actual user ID
      step,
      answers: Object.values(answers),
      score: calculateScore(),
    };

    try {
      await submitExam(payload).unwrap();
      console.log("Exam submitted:", payload);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // Simple score calculation (%)
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q._id]?.selectedAnswer === q.correctAnswer) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  // Redirect to result page
  const goToResultPage = () => router.push("/dashboard/student/results");

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  if (isLoading)
    return (
      <p className="flex h-screen items-center justify-center">
        Loading questions...
      </p>
    );
  if (questions.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>No questions available for this step.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={() => router.push("/dashboard/student")}
        >
          Back to Dashboard
        </button>
      </div>
    );

  if (isFinished)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-6 md:p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">🎉 Exam Completed!</h1>
          <p className="mb-6">
            You have completed all questions for this step.
          </p>
          <p className="mb-6">Score: {calculateScore()}%</p>
          <button
            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg"
            onClick={goToResultPage}
          >
            View Results
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-md p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold">
              Step {step} - Digital Competency Exam
            </h1>
            <p className="text-sm text-gray-600">
              {currentQuestion.competency}
            </p>
          </div>
          <div
            className={`text-lg font-bold ${
              timeLeft < 10 ? "text-red-500" : "text-blue-600"
            }`}
          >
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl md:text-2xl font-bold mb-6">
          {currentQuestion.questionText}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {(["A", "B", "C", "D"] as const).map((opt) => (
            <div
              key={opt}
              onClick={() => handleOptionSelect(opt)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedOption === opt
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              } ${
                selectedOption && selectedOption !== opt ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                    selectedOption === opt
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {opt}
                </div>
                <span>{currentQuestion.options[opt]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          {currentIndex > 0 && (
            <button
              onClick={handlePreviousQuestion}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              ← Previous
            </button>
          )}
          <button
            onClick={() => handleNextQuestion(selectedOption)}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg"
          >
            {isLastQuestion ? "Finish Exam 📤" : "Next Question →"}
          </button>
        </div>

        {/* Progress */}
        <div className="mt-4 text-sm text-gray-500">
          {Object.keys(answers).length}/{questions.length} answered,{" "}
          {questions.length - Object.keys(answers).length} remaining
        </div>
      </div>
    </div>
  );
}
