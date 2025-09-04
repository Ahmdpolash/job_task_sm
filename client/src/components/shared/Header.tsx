import { ArrowRight, Heart, Menu, Shapes } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div>
      {/* Header */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <div className="bg-white rounded-full shadow-lg border border-gray-300 px-6 py-3 flex items-center justify-between">
          <Link
            href="#"
            className="cursor-pointer flex items-center justify-center"
            prefetch={false}
          >
            <Shapes className="h-6 w-6 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              ECompetence
            </span>
          </Link>
          <nav className="hidden lg:flex gap-6 items-center">
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-primary-600 transition-colors text-gray-600"
              prefetch={false}
            >
              Exam
            </Link>
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary-600 transition-colors text-gray-600"
              prefetch={false}
            >
              Features
            </Link>
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary-600 transition-colors text-gray-600"
              prefetch={false}
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button className="cursor-pointer text-sm bg-[#7C4DFF] text-white hover:bg-primary-700 rounded-full px-4 py-2 font-medium shadow-lg">
                Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <Button variant="ghost" className="lg:hidden cursor-pointer">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>
    </div>
  );
};

export default Header;
