"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Geniusz Logo" src="/mainlogo.png" />
        </div>
        <h1 className="text-3xl font-bold text-white">Geniusz</h1>
      </Link>
      <div className="flax items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Rozpocznij bezpłatnie
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
