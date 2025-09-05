// app/unauthorized/page.tsx
"use client";

import Link from "next/link";
import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
      <p className="mb-6 text-gray-700">
        You do not have permission to view this page.
      </p>
      <Link href="/login">
        <button className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Go to Login
        </button>
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
