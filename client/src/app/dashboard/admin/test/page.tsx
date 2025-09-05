"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
  useUpdateQuestionMutation,
} from "@/redux/features/question/questionApi";
import { i, option } from "framer-motion/client";
import { Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getDifficultyColor, getLevelColor } from "@/app/utils";

const TestPage = () => {
  const { data, isLoading } = useGetQuestionsQuery({});
  const [deleteQuestion, { isSuccess }] = useDeleteQuestionMutation();
  const [updateQuestion, { isSuccess: isUpdateSuccess }] =
    useUpdateQuestionMutation();
  const [addQuestion, { isSuccess: isAddSuccess }] = useAddQuestionMutation();

  const questions = data?.data;

  // Delete question
  useEffect(() => {
    if (isSuccess) {
      toast.success("Question deleted successfully");
    }
  }, [isSuccess]);
  const handleDeleteQuestion = async (id: string) => {
    await deleteQuestion(id);
  };

  // update question
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    competency: "",
    level: "",
    difficulty: "Easy",
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle options
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // map answerOptions array into options object
    const payload = {
      competency: formData.competency,
      level: formData.level,
      difficulty: formData.difficulty,
      questionText: formData.questionText, 
      options: {
        A: formData.options[0],
        B: formData.options[1],
        C: formData.options[2],
        D: formData.options[3],
      },
      correctAnswer: formData.correctAnswer, 
    };

    try {
      await addQuestion(payload).unwrap();
      setOpen(false);
      setFormData({
        competency: "",
        level: "",
        difficulty: "Easy",
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    if (isAddSuccess) {
      toast.success("Question added successfully");
    }
  }, [isAddSuccess]);

  return (
    <div>
      <div className="bg-white p-4 rounded-md mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Manage Questions</h1>

        {/* modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="cursor-pointer">
              Add New Question
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {/* competency */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="competency" className="text-right">
                    Competency
                  </Label>
                  <Input
                    id="competency"
                    name="competency"
                    value={formData.competency}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>

                {/* level */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="level" className="text-right">
                    Level
                  </Label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="col-span-3 p-2 border rounded-md"
                  >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                  </select>
                </div>

                {/* difficulty */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="difficulty" className="text-right">
                    Difficulty
                  </Label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="col-span-3 p-2 border rounded-md"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                {/* question */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="questionText" className="text-right">
                    Question
                  </Label>
                  <Input
                    id="questionText"
                    name="questionText"
                    value={formData.questionText}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>

                {/* answer options */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Answer Options</Label>
                  <div className="col-span-3 space-y-2">
                    {formData.options.map((option, index) => (
                      <Input
                        key={index}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        placeholder={`Option ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* correct answer */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="correctAnswer" className="text-right">
                    Correct Answer
                  </Label>
                  <select
                    id="correctAnswer"
                    name="correctAnswer"
                    value={formData.correctAnswer}
                    onChange={handleInputChange}
                    className="col-span-3 p-2 border rounded-md"
                  >
                    <option value="">Select Correct Answer</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="cursor-pointer">
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Questions ({questions?.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Competency</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions?.length !== 0 ? (
                  <>
                    {questions?.map((question: any) => (
                      <TableRow key={question._id}>
                        <TableCell className="">{question._id}</TableCell>
                        <TableCell className="max-w-md">
                          <div className="truncate">
                            {question?.questionText}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-slate-600">
                            {question?.competency}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getLevelColor(question.level)}>
                            {question?.level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getDifficultyColor(question.difficulty)}
                          >
                            {question?.difficulty}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-500">
                          {new Date(question?.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cursor-pointer"
                              //   onClick={() => handleEditQuestion(question?._id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteQuestion(question._id)}
                              className="cursor-pointer text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <div className="flex h-screen justify-center items-center">
                    <p className="text-lg font-medium text-gray-500">
                      No questions found
                    </p>
                  </div>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestPage;
