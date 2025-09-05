import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  CogIcon,
  HomeIcon,
  LucideMenu,
  TextIcon,
  TrophyIcon,
  UserCircleIcon,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const UserDashboardPage = () => {
  const examProgress = [
    {
      step: 1,
      title: "Step 1: A1 & A2 Levels",
      status: "completed",
      score: 76,
      level: "A2",
      canTake: false,
      message: "Passed with A2 certification",
    },
    {
      step: 2,
      title: "Step 2: B1 & B2 Levels",
      status: "available",
      score: null,
      level: null,
      canTake: true,
      message: "Ready to take",
    },
    {
      step: 3,
      title: "Step 3: C1 & C2 Levels",
      status: "locked",
      score: null,
      level: null,
      canTake: false,
      message: "Complete Step 2 first",
    },
  ];

  const user = {
    name: "John Doe",
    email: "john@example.com",
    currentLevel: "A2",
    highestLevel: "A2",
    completedSteps: [1],
    canTakeStep1: false,
    canTakeStep2: true,
    canTakeStep3: false,
    totalExamsTaken: 1,
    averageScore: 76,
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircleIcon;
      case "available":
        return ClockIcon;
      case "locked":
        return XCircleIcon;
      default:
        return ClockIcon;
    }
  };

  const getLevelBadgeColor = (level: string) => {
    const colors = {
      A1: "bg-yellow-100 text-yellow-800",
      A2: "bg-orange-100 text-orange-800",
      B1: "bg-blue-100 text-blue-800",
      B2: "bg-indigo-100 text-indigo-800",
      C1: "bg-purple-100 text-purple-800",
      C2: "bg-pink-100 text-pink-800",
    };
    return colors[level as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex-1 w-full">
      {/* Page content */}
      <main className="">
        {/* Header */}
        <div className="mb-6 bg-white p-5 rounded-lg shadow-sm border">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Track your digital competency progress and take assessments.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrophyIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Current Level
                </p>
                <div className="flex items-center mt-1">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelBadgeColor(
                      user.currentLevel
                    )}`}
                  >
                    {user.currentLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpenIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Exams Taken</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {user.totalExamsTaken}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Average Score
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {user.averageScore}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TextIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Completed Steps
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {user.completedSteps.length}/3
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Progress */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Exam Progress
            </h2>
            <p className="text-gray-600 mt-1">
              Your journey through the digital competency levels
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {examProgress.map((step, index) => {
                const Icon = getStepIcon(step.status);
                return (
                  <div key={step.step} className="relative">
                    {/* Connection line */}
                    {index < examProgress.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                    )}

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.status === "completed"
                              ? "bg-green-100"
                              : step.status === "available"
                              ? "bg-blue-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <Icon
                            className={`h-6 w-6 ${
                              step.status === "completed"
                                ? "text-green-600"
                                : step.status === "available"
                                ? "text-blue-600"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="ml-6 flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-medium text-gray-900">
                              {step.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {step.message}
                            </p>
                            {step.score && (
                              <div className="flex items-center mt-2 space-x-4">
                                <span className="text-sm text-gray-600">
                                  Score:{" "}
                                  <span className="font-semibold">
                                    {step.score}%
                                  </span>
                                </span>
                                {step.level && (
                                  <span
                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelBadgeColor(
                                      step.level
                                    )}`}
                                  >
                                    {step.level} Level
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex-shrink-0">
                            {step.canTake && step.status === "available" && (
                              <Link href={"/dashboard/student/exam"}>
                                <button className=" cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                                  Take Exam
                                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </button>
                              </Link>
                            )}
                            {step.status === "completed" && (
                              <Link href={"/dashboard/student/results"}>
                                <button className=" cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">
                                  View Results
                                </button>
                              </Link>
                            )}
                            {step.status === "locked" && (
                              <span className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-500 text-sm rounded-md">
                                Locked
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Next Steps */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Next Steps
              </h3>
            </div>
            <div className="p-6">
              {user.canTakeStep2 ? (
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpenIcon className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      Take Step 2 Exam
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Ready to advance to B1/B2 levels
                    </p>
                    <button className="mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                      Start Exam
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrophyIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-900 mb-2">
                    Great Progress!
                  </h4>
                  <p className="text-sm text-gray-600">
                    Complete the available steps to unlock more levels.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">✅</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Completed Step 1 Exam
                    </p>
                    <p className="text-xs text-gray-600">
                      Achieved A2 level with 76% score
                    </p>
                    <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Account Created
                    </p>
                    <p className="text-xs text-gray-600">
                      Welcome to Test School!
                    </p>
                    <p className="text-xs text-gray-400 mt-1">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboardPage;
