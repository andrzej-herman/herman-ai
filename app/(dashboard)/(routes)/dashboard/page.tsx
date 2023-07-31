"use client";

import { Card } from "@/components/ui/card";
import { TOOLS } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Odkryj potęgę sztucznej inteligencji
        </h2>
        <h5 className="text-muted-foreground font-normal text-xs md:text-lg text-center">
          Poznaj Geniusza - najbardziej zaawansowany model AI
        </h5>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {TOOLS.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between 
            shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold md:text-xl">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
      <p className="text-zinc-400 text-center text-xs mt-20">
        Wykonanie: Andrzej Herman - Software Developer
      </p>
    </div>
  );
};

export default DashboardPage;
