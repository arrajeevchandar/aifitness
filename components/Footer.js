import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-black/60 backdrop-blur-lg shadow-lg border-t border-gray-700 text-center text-lg-start">
      {/* Copyright Section */}
      <div className="text-center p-3 text-white">
        © 2025 Copyright:{" "}
        <Link
          className="text-primary font-medium hover:underline"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          AI Fitness Planner
        </Link>
      </div>
    </footer>
  );
}
