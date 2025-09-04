"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Shield, Check } from "lucide-react";
import Link from "next/link";
// import { useActivationMutation } from "@/redux/features/auth/authApi";
// import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { useVerifyOtpMutation } from "@/redux/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";

type verifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

export default function Otp() {
  //   const [activation, { data, isSuccess }] = useActivationMutation();
  const [verifyOtp, { data, isSuccess, isLoading }] = useVerifyOtpMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [invalidError, setInvalidError] = useState(false);
  const [verifyNumber, setVerifyNumber] = useState<verifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
  });

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);

    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {};

  // const handleVerify = async () => {
  //   const verificationNumber = Object.values(verifyNumber).join("");

  //   if (verificationNumber.length !== 4) {
  //     setInvalidError(true);
  //     return;
  //   }

  //   try {
  //     await verifyOtp({ otp: verificationNumber }).unwrap();
  //     toast.success("Account verified successfully");
  //     router.push("/login");
  //   } catch (error: any) {
  //     toast.error(error?.data?.message || "Something went wrong");
  //     setInvalidError(true);
  //   }
  // };

  const handleVerify = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");

    if (!email) {
      console.error("Email not found!");
      return;
    }

    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      toast.error("Please enter a 4-digit OTP");
      return;
    }

    try {
      await verifyOtp({ otp: verificationNumber, email }).unwrap();
      // if unwrap succeeds, OTP is correct
      toast.success("Account verified successfully");
      router.push("/login");
    } catch (error: any) {
      // if unwrap throws, OTP is wrong or expired
      toast.error(error?.data?.message || "Invalid OTP");
      setInvalidError(true);
    }
  };

  return (
    <div className="   text-slate-700 px-10 lg:px-16 py-6 lg:py-10 rounded-2xl border border-blue-500/50">
      <div className=" flex flex-col items-center">
        <h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-8">
          Verify Your Account
        </h1>

        <div className="bg-[#4169e1] rounded-full p-4 lg:p-5 mb-6 lg:mb-10 wf">
          <div className="flex items-center justify-center">
            <Shield className="w-7 lg:w-8 h-7 lg:h-8 text-white" />
            <Check className="w-5 h-5 text-white absolute" />
          </div>
        </div>

        <div className="flex gap-4 mb-8 w-full justify-center">
          {Object.keys(verifyNumber).map((digit, index) => (
            <div key={index} className="w-16 h-16 relative">
              <input
                id={`otp-${index}`}
                type="number"
                inputMode="numeric"
                maxLength={1}
                value={verifyNumber[digit as keyof verifyNumber]}
                ref={inputRefs[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-full h-full bg-transparent text-center text-xl font-bold rounded-[10px] dark:text-white text-black focus:border-[#4169e1] focus:outline-none 
                    ${
                      invalidError
                        ? "shake border-3 border-red-500"
                        : "border-3 dark:border-white border-[#0000004a]"
                    }
                  `}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="cursor-pointer w-full py-3 lg:py-4 bg-[#4169e1] text-white rounded-full font-medium mb-6 lg:mb-8 hover:bg-[#3a5cd0] transition-colors"
        >
          {isLoading ? "Verifying..." : "Verify Account"}
        </button>

        <div className="text-center">
          <span className="text-gray-400">Go back to sign in?</span>{" "}
          <Link href="/login" className="text-[#4169e1]">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
