// questions interface

export interface IQuestion {
  _id?: string;
  competency: string; // "Competency 1", "Competency 2", etc. (1-22)
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  step: 1 | 2 | 3; // Auto-calculated based on level
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  difficulty: number; // 1-5
  explanation?: string; // Optional explanation for correct answer
  isActive: boolean;
  createdBy?: string; // Admin user ID
  createdAt?: Date;
  updatedAt?: Date;
}
