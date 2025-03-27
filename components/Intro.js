import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Intro() {
  const { data: session } = useSession();

  return (
    <div className="max-w-3xl mx-auto text-center mt-8 px-6">
      <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
        Welcome to AI Fitness Planner
      </h1>

      <p className="mt-4 text-lg sm:text-xl text-gray-300 font-medium tracking-wide">
        Your personalized fitness companion. Whether you're a beginner or a pro, we provide expert guidance to help you achieve your goals.
      </p>

      <Link href={session ? "/" : "/auth/signup"}>
        <p className="mt-6 text-lg sm:text-xl font-semibold text-white uppercase tracking-wider bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
          Start Your Fitness Journey Today!
        </p>
      </Link>
    </div>
  );
}
