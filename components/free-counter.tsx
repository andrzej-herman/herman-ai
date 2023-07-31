"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import Link from "next/link";

interface FreeCounterProps {
  freeTokensUsed: number;
}

const FreeCounter = ({ freeTokensUsed = 0 }: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p className="font-bold text-blue-400">Wersja darmowa</p>
            <p className="text-xs">
              Pozostało {MAX_FREE_COUNTS - freeTokensUsed} z {MAX_FREE_COUNTS} darmowych tokenów
            </p>
            <Progress
              className="h-3"
              value={(freeTokensUsed / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Link href="/premiumplans">
            <Button className="w-full" variant="premium">
              Zdobądź więcej tokenów
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
