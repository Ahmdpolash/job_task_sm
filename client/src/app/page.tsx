import Hero from "@/components/pages/home/Hero";
import Header from "@/components/shared/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50 text-gray-800">
      <Header />
      <Hero />
    </div>
  );
}
