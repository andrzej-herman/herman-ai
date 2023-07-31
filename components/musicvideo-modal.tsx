"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMusicVideoModal } from "@/hooks/use-musicvideo-modal";
import { TOOLS } from "@/constants";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const MusicVideoModal = () => {
  const mvModal = useMusicVideoModal();

  return (
    <Dialog open={mvModal.isOpen} onOpenChange={mvModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex flex-col items-center gap-y-2 font-bold py-1 px-8">
              <div className="flex items-center flex-col justify-center">
                <div className="text-lg text-center">
                  {" "}
                  Muzykę i video możesz tworzyć tylko w wersji
                </div>
                <div className="flex items-center justify-center mt-2">
                  <p className="text-2xl text-center">Geniusz</p>
                  <Badge
                    className="uppercase text-sm py-1 px-3 ml-2"
                    variant="premium"
                  >
                    pro
                  </Badge>
                </div>
              </div>

              <p className=" text-md text-zinc-500 text-center mt-4">
                Zakup pakiet tokenów. Będziesz mieć dostęp do wszystkich
                generatorów Geniusza:
              </p>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {TOOLS.map((tool) => (
              <Card
                key={tool.href}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link href="/premiumplans" className="w-full">
            <Button
              size="lg"
              variant="premium"
              className="w-full mt-2"
              onClick={mvModal.onClose}
            >
              Wybierz odpowiedni pakiet dla siebie
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MusicVideoModal;
