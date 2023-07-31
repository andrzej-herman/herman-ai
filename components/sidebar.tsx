"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import FreeCounter from "@/components/free-counter";
import { Badge } from "@/components/ui/badge";
import ProCounter from "@/components/pro-counter";

const routes = [
  {
    label: "Narzędzia AI",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
    ispro: false,
  },
  {
    label: "Czat AI",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    ispro: false,
  },
  {
    label: "Generowanie obrazów",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    ispro: false,
  },
  {
    label: "Generowanie video",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-600",
    ispro: true,
  },
  {
    label: "Generowanie muzyki",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    ispro: true,
  },
  {
    label: "Generowanie kodu",
    icon: Code,
    href: "/code",
    color: "text-green-700",
    ispro: false,
  },
  {
    label: "Ustawienia",
    icon: Settings,
    href: "/settings",
    color: "text-gray-400",
  },
];

interface SidebarProps {
  isPro: Boolean;
  freeTokensUsed: number;
  proTokensUsed: number;
  proTokensPurchased: number;
}

const Sidebar = ({
  isPro = false,
  freeTokensUsed = 0,
  proTokensUsed = 0,
  proTokensPurchased = 0,
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-10 h-10 mr-2">
            <Image fill alt="Geniusz Logo" src="/mainlogo.png" />
          </div>
          <h1 className="text-3xl font-bold">Geniusz</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-md group flex w-full p-3 justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
                {route.ispro ? (
                  <Badge
                    variant="premium"
                    className="uppercase text-xs ml-2 py-1 px-2"
                  >
                    pro
                  </Badge>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {isPro ? (
        <ProCounter
          proTokensUsed={proTokensUsed}
          proTokensPurchased={proTokensPurchased}
        />
      ) : (
        <FreeCounter freeTokensUsed={freeTokensUsed} />
      )}
    </div>
  );
};

export default Sidebar;
