"use client";

import { sidebarConfig } from "@/constant";
import {
  useGetMeQuery,
  useLogOutMutation,
} from "@/redux/features/auth/authApi";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckCircleIcon,
  CogIcon,
  LucideMenu,
  Shapes,
  UserCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 👈 active path detect করার জন্য
import { useEffect, useState } from "react";

const UserSidebar = ({ role }: any) => {
  const [logOut, { isSuccess, isLoading }] = useLogOutMutation();
  const { data } = useGetMeQuery({});
  const userInfo = data?.data;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await logOut({});
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/";
    }
  }, [isSuccess]);

  const items = sidebarConfig[role] || [];

  return (
    <div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed h-screen inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <Link
              href="/"
              className="cursor-pointer flex items-center justify-center"
              prefetch={false}
            >
              <Shapes className="h-6 w-6 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                ECompetence
              </span>
            </Link>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <CheckCircleIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar items */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href; // 👈 active check

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="flex items-center">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {userInfo?.name}
              </p>
              <p className="text-xs text-gray-500">{userInfo?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-2 cursor-pointer border bg-red-600 flex items-center w-full px-3 py-2 text-sm text-white rounded-md  "
          >
            <ArrowRightIcon className="mr-3 h-4 w-4" />
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      {/* Mobile topbar */}
      <div className="lg:hidden bg-white shadow-sm border-b w-full">
        <div className="flex items-center justify-between h-16 px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <LucideMenu className="h-5 w-5" />
          </button>
          <Link
            href="/"
            className="cursor-pointer flex items-center justify-center"
            prefetch={false}
          >
            <Shapes className="h-6 w-6 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              ECompetence
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
