import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <div>
      <main className="flex h-screen items-center justify-center">
        {/* Hero Section */}
        <section className="w-full  bg-gradient-to-br from-primary-50 via-white to-primary-50/30 mt-10">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 mb-4">
                🎯 Step-Based English Proficiency Testing
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-gray-900 font-serif md:text-7xl">
                Test. Learn. Achieve Your Level.
              </h1>
              <p className="text-lg text-gray-600 md:text-xl max-w-2xl mx-auto">
                Take interactive exams from A1 to C2, get instant results, and
                earn your certification. Progress through levels with confidence
                and track your achievements in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className=" cursor-pointer text-white hover:bg-primary-700 bg-[#7C4DFF] shadow-xl px-8 py-3"
                >
                  Start Exam <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className=" cursor-pointer border-primary-200 text-primary-700 hover:bg-primary-50 px-8 py-3 bg-transparent"
                >
                  Learn More
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Free to try. No credit card required.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Hero;
