import Link from "next/link";
import { Button } from "@/components/ui/button"; // Adjust path if needed

export default function Navbar() {
  return (
    <div className="p-4 border-b fixed w-full z-50 bg-black">
      <div className="flex max-w-5xl mx-auto items-center">
        {/* Logo / Title */}
        <h1 className="inline-block text-transparent bg-clip-text text-5xl font-bold bg-gradient-to-r from-[#d946ef] to-[#0ea5e9]">
          AI Fitness Planner
        </h1>

        {/* Spacer to push button to the right */}
        <div className="ml-auto">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
