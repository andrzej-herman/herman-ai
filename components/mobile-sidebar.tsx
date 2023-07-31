"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
  isPro: Boolean;
  freeTokensUsed: number;
  proTokensUsed: number;
  proTokensPurchased: number;
}

const MobileSidebar = ({
  isPro = false,
  freeTokensUsed = 0,
  proTokensUsed = 0,
  proTokensPurchased = 0,
}: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar
          isPro={isPro}
          freeTokensUsed={freeTokensUsed}
          proTokensUsed={proTokensUsed}
          proTokensPurchased={proTokensPurchased}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
