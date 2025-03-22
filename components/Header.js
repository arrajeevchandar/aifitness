'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession, signIn } from 'next-auth/react';
import ProfileDropdown from './ProfileDropdown'; // Import the dropdown

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="p-4 border-b fixed w-full z-50 bg-black">
      <div className="flex max-w-5xl mx-auto items-center">
        {/* Logo / Title */}
        <h1 className="inline-block text-transparent bg-clip-text text-5xl font-bold bg-gradient-to-r from-[#d946ef] to-[#0ea5e9]">
          AI Fitness Planner
        </h1>

        {/* Spacer to push button to the right */}
        <div className="ml-auto">
          {session ? <ProfileDropdown /> : <Button onClick={() => signIn()}>Login</Button>}
        </div>
      </div>
    </div>
  );
}
