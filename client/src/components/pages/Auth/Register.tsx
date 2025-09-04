"use client";

import { useRegisterMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const Register = () => {
  const [register, { data, isSuccess, isLoading }] = useRegisterMutation();

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(`/otp-verification?email=${encodeURIComponent(form.email)}`);
    }
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(form).unwrap();
    } catch (error:any) {
      console.error("Registration failed:", error);
      toast.error(error.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 ">
      <form
        onSubmit={handleSubmit}
        className="dark:bg-gray-800 bg-white p-6 rounded-xl shadow-lg  gap- w-full max-w-md border border-gray-200 dark:border-gray-700 "
      >
        <div>
          <h2 className="text-3xl font-bold  text-center mb-1">Register</h2>
        </div>

        <div className="flex flex-col gap-y-2 mb-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 pl-1"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            required
          />
        </div>

        <div className="flex flex-col gap-y-2 mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 pl-1"
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            required
          />
        </div>

        <div className="flex flex-col gap-y-2 ">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 pl-1"
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold shadow-md transition-colors duration-200 cursor-pointer w-full my-3"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <span className="text-sm  text-gray-600 dark:text-gray-300 pt-2">
          Already have an account ?{" "}
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue-400 text-center mx-auto hover:underline font-medium pt-2"
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
