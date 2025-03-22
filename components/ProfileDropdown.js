'use client';

import { useSession, signOut } from 'next-auth/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function ProfileDropdown() {
  const { data: session } = useSession();

  if (!session) return null; // Hide dropdown if not logged in

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Image
            src={session.user.image || "/default-avatar.png"} // Fallback avatar
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          {session.user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Button variant="ghost" onClick={() => signOut()}>Logout</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
