import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GenerationExamplesProps {
  title: string;
  description: string;
  examples: string[];
}

const GenerationExamples = ({
  title,
  description,
  examples,
}: GenerationExamplesProps) => {
  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Zobacz przykładowe zapytania</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              <div className="mt-4">
                <p>{description}</p>
                <div className="flex flex-col gap-y-3 mt-4">
                  {examples.map((example) => (
                    <Card key={example} className="px-3 py-2">
                      {example}
                    </Card>
                  ))}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerationExamples;
