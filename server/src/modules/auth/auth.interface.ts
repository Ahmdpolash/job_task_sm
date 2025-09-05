// auth interface

export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
  SUPERVISOR = "supervisor",
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  isEmailVerified: boolean;
  role: UserRole;
  otp?: string;
  otpExpiry?: Date;
  completedLevels?: number;
  currentLevel?: string;
  totalExams?: number;
}
