// sidebarConfig.ts
import {
  HomeIcon,
  BookOpenIcon,
  TrophyIcon,
  CogIcon,
  UsersIcon,
  ShieldIcon,
} from "lucide-react";

export const sidebarConfig: Record<
  string,
  { name: string; href: string; icon: any }[]
> = {
  student: [
    { name: "Dashboard", href: "/dashboard/student", icon: HomeIcon },
    { name: "Take Exam", href: "/dashboard/student/exam", icon: BookOpenIcon },
    { name: "Results", href: "/dashboard/student/results", icon: TrophyIcon },
    { name: "Certificates", href: "/dashboard/student/certificates", icon: CogIcon },
  ],
  admin: [
    { name: "Dashboard", href: "/dashboard/admin", icon: HomeIcon },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: UsersIcon },
    { name: "Settings", href: "/dashboard/admin/settings", icon: CogIcon },
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
