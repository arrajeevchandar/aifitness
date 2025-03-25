'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession, signIn } from 'next-auth/react';
import ProfileDropdown from './ProfileDropdown';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-lg shadow-lg border-b border-gray-700">
      <div className="flex max-w-6xl mx-auto items-center justify-between px-6 py-3">
        {/* Logo / Title */}
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          <span className="bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
            AI Fitness Planner
          </span>
        </h1>

        {/* Auth Button / Profile */}
        <div>
          {session ? (
            <ProfileDropdown />
          ) : (
            <Button
              onClick={() => signIn()}
              className="px-6 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition duration-200"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
