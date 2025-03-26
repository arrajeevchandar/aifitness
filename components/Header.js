"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "";
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "?";

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-lg shadow-lg border-b border-gray-700">
      <div className="flex max-w-6xl mx-auto items-center justify-between px-6 py-3">
        {/* Logo / Title */}
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          <span className="bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
            AI Fitness Planner
          </span>
        </h1>

        {/* Auth Buttons / Profile */}
        <div className="flex gap-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-gray-700/40">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback>{firstLetter}</AvatarFallback>
                  </Avatar>
                  {userName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-md">
                <DropdownMenuItem onClick={() => signOut()} className="px-4 py-2 hover:bg-gray-200">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login">
                <Button className="px-6 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition duration-200">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="px-6 py-2 rounded-md bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold hover:scale-105 transition duration-200">
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
