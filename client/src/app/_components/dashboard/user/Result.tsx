"use client";

import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useGetUserExamResultsQuery } from "@/redux/features/exam/examApi";

export default function Result() {
  const { data: userData } = useGetMeQuery({});
  const user = userData?.data;

  if (!user) return null;

  const userId = user?._id;
  const { data, isLoading } = useGetUserExamResultsQuery(userId);

  if (isLoading) return <p className="text-center mt-10">Loading results...</p>;

  const results = data?.data || [];
  const totalScore = results.reduce((acc: number, r: any) => acc + r.score, 0);
  const avgScore =
    results.length > 0 ? (totalScore / results.length).toFixed(2) : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">📊 Exam Results</h1>

        {results.length === 0 ? (
          <p className="text-center text-gray-600">No results available yet.</p>
        ) : (
          <>
            {/* Step Results */}
            <div className="space-y-4">
              {[1, 2, 3].map((step) => {
                const stepResult = results.find((r: any) => r.step === step);
                return (
                  <div
                    key={step}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <span className="font-semibold">Step {step}</span>
                    {stepResult ? (
                      <span className="text-blue-600 font-bold">
                        {stepResult.score}%
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">Not completed</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="border-t pt-4 mt-6 text-center">
              <p className="font-semibold text-gray-700">
                ✅ Average Score:{" "}
                <span className="text-green-600">{avgScore}%</span>
              </p>
              <p className="text-gray-600 text-sm">
                Completed {results.length}/3 steps
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
