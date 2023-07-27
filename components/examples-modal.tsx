import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

interface ExamplesModalProps {
  modalType: string;
  isOpen: boolean;
}

const ExamplesModal = ({ modalType, isOpen }: ExamplesModalProps) => {
  const title =
    modalType === "code" ? "Code generation prompt examples" : "Herman";

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              {title}
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            <Card className="p-3 border-black/5 flex items-center justify-between">
              ŁKS klubem Łodzi jest !!!
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ExamplesModal;
