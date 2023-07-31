"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProCounterProps {
  proTokensUsed: number;
  proTokensPurchased: number;
}

const ProCounter = ({
  proTokensUsed = 0,
  proTokensPurchased = 0,
}: ProCounterProps) => {
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
          <div className="flex flex-col items-center justify-center mb-4">
            <Image width={50} height={50} src="/pro.png" alt="Pro User"  />
            <div className="flex items-center justify-center mt-2">
              <p className="font-bold text-blue-400 text-lg">Geniusz</p>
              <Badge className="uppercase py-1 ml-2" variant="premium">
                pro
              </Badge>
            </div>
            <p className="text-sm text-white mt-3">
              Pozostało {proTokensPurchased - proTokensUsed} z{" "}
              {proTokensPurchased} tokenów
            </p>
            <Progress
              className="h-3 mt-2"
              value={(proTokensUsed / proTokensPurchased) * 100}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProCounter;
