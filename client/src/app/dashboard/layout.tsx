// import UserSidebar from "@/app/_components/dashboard/user/Sidebar";
// import React from "react";

// const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const user = {
//     name: "John Doe",
//     email: "john@example.com",
//     currentLevel: "A2",
//     highestLevel: "A2",
//     completedSteps: [1],
//     canTakeStep1: false,
//     canTakeStep2: true,
//     canTakeStep3: false,
//     totalExamsTaken: 1,
//     averageScore: 76,
//   };
//   return (
//     <div className="min-h-screen bg-gray-100 flex lg:flex-row flex-col">
//       {/* Sidebar */}
//       <UserSidebar user={user} />

//       {/* Main content */}
//       <main className="flex-1 lg:ml-64 p-4">{children}</main>
//     </div>
//   );
// };

// export default UserDashboardLayout;

import UserSidebar from "../_components/dashboard/user/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const role = "student";

  return (
    <div className="min-h-screen bg-gray-100 flex lg:flex-row flex-col">
      <UserSidebar role={role} />
      <main className="flex-1 lg:ml-64 p-4">{children}</main>
    </div>
  );
}
