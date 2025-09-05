"use client";
import {
  useGetMeQuery,
  useGetTotalCountsQuery,
} from "@/redux/features/auth/authApi";
import React from "react";
import { Users, ClipboardCheck, CheckSquare, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BookOpen,
  TrendingUp,
  XCircle,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { recentTests } from "@/constant";
import { Badge } from "@/components/ui/badge";

const page = () => {
  const { data: totalCount } = useGetTotalCountsQuery([{}]);
  const count = totalCount?.data;

  const { data } = useGetMeQuery({});
  const user = data?.data;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: string) => {
    const colors = {
      A1: "bg-blue-100 text-blue-800",
      A2: "bg-indigo-100 text-indigo-800",
      B1: "bg-purple-100 text-purple-800",
      B2: "bg-pink-100 text-pink-800",
      C1: "bg-orange-100 text-orange-800",
      C2: "bg-red-100 text-red-800",
      Failed: "bg-red-100 text-red-800",
    };
    return colors[level as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const cardData = [
    {
      id: 1,
      title: "Total Users",
      value: count?.users || "0",
      borderColor: "border-blue-500",
      icon: <Users className="text-blue-500" size={24} />,
      iconBg: "bg-blue-100",
      description: "",
    },
    {
      id: 2,
      title: "Active Tests",
      value: count?.questions || "0",
      borderColor: "border-green-500",
      icon: <ClipboardCheck className="text-green-500" size={24} />,
      iconBg: "bg-green-100",
      description: "Currently in progress",
    },
    {
      id: 3,
      title: "Completed Tests",
      value: "6",
      borderColor: "border-purple-500",
      icon: <CheckSquare className="text-purple-500" size={24} />,
      iconBg: "bg-purple-100",
      description: "",
    },
    {
      id: 4,
      title: "Certifications",
      value: "3",
      borderColor: "border-amber-500",
      icon: <Award className="text-amber-500" size={24} />,
      iconBg: "bg-amber-100",
      description: "Avg score: 72.3%",
    },
  ];

  return (
    <div>
      <div className="mb-6 bg-white p-5 rounded-lg shadow-sm border">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Track your digital competency progress and take assessments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardData.map((card) => (
          <div
            key={card.id}
            className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${card.borderColor}`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-500 text-sm font-medium">
                {card.title}
              </h3>
              <div className={`p-2 rounded-lg ${card.iconBg}`}>{card.icon}</div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">
              {card.value}
            </p>
            {card.description && (
              <p className="text-sm text-gray-400 mt-1">{card.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Test Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Test Results</CardTitle>
            <Button variant="outline" size="sm">
              View All Results
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Test Type</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Level Achieved</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Completed</TableHead>

                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">
                          {test.userName}
                        </div>
                        <div className="text-sm text-slate-500">
                          {test.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">
                        {test.testType}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{test.score}%</span>
                        {test.score >= 75 && (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        )}
                        {test.score < 25 && (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        {test.score >= 25 && test.score < 75 && (
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getLevelColor(test.level)}>
                        {test.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(test.status)}>
                        {test.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">
                        {test.completedAt}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
