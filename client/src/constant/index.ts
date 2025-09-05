// sidebarConfig.ts
import {
  HomeIcon,
  BookOpenIcon,
  TrophyIcon,
  CogIcon,
  UsersIcon,
  ShieldIcon,
  CheckSquare2,
} from "lucide-react";

export const sidebarConfig: Record<
  string,
  { name: string; href: string; icon: any }[]
> = {
  student: [
    { name: "Dashboard", href: "/dashboard/student", icon: HomeIcon },
    { name: "Take Exam", href: "/dashboard/student/exam", icon: BookOpenIcon },
    { name: "Results", href: "/dashboard/student/results", icon: TrophyIcon },
    {
      name: "Certificates",
      href: "/dashboard/student/certificates",
      icon: CogIcon,
    },
  ],
  admin: [
    { name: "Dashboard", href: "/dashboard/admin", icon: HomeIcon },
    { name: "Manage Test", href: "/dashboard/admin/test", icon: CheckSquare2 },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: UsersIcon },
  ],
  supervisor: [
    { name: "Dashboard", href: "/dashboard/supervisor", icon: HomeIcon },
    {
      name: "Manage Exams",
      href: "/dashboard/supervisor/exams",
      icon: ShieldIcon,
    },
    { name: "Settings", href: "/dashboard/supervisor/settings", icon: CogIcon },
  ],
};

export const recentTests = [
  {
    id: 1,
    userName: "John Smith",
    email: "john.smith@email.com",
    testType: "Step 1 (A1-A2)",
    score: 85,
    level: "A2",
    status: "Completed",
    completedAt: "2024-01-20 14:30",
    duration: "45 min",
  },
  {
    id: 2,
    userName: "Sarah Johnson",
    email: "sarah.j@email.com",
    testType: "Step 2 (B1-B2)",
    score: 92,
    level: "B2",
    status: "Completed",
    completedAt: "2024-01-20 13:15",
    duration: "52 min",
  },
  {
    id: 3,
    userName: "Mike Chen",
    email: "mike.chen@email.com",
    testType: "Step 1 (A1-A2)",
    score: 15,
    level: "Failed",
    status: "Failed",
    completedAt: "2024-01-20 12:45",
    duration: "38 min",
  },
  {
    id: 4,
    userName: "Emma Wilson",
    email: "emma.w@email.com",
    testType: "Step 3 (C1-C2)",
    score: 78,
    level: "C1",
    status: "Completed",
    completedAt: "2024-01-20 11:20",
    duration: "58 min",
  },
  {
    id: 5,
    userName: "David Brown",
    email: "david.brown@email.com",
    testType: "Step 2 (B1-B2)",
    score: 0,
    level: "In Progress",
    status: "In Progress",
    completedAt: "Started 2024-01-20 15:00",
    duration: "25 min elapsed",
  },
];
