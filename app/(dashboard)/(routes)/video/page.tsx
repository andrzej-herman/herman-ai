"use client";

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { useMusicVideoModal } from "@/hooks/use-musicvideo-modal";
import GenerationExamples from "@/components/generation-examples";

export const examples = [
  "dwa psy bawiące się na ulicy",
  "ryba w głębokim oceanie",
  "reklama Coca Coli",
];

const VideoGenerationPage = () => {
  const mvModal = useMusicVideoModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const response = await axios.post("/api/video", values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 402) {
        mvModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Generowanie video"
        description="Zamień swoje pomysły na video stworzone przez sztuczną inteligencję"
        icon={VideoIcon}
        iconColor="text-orange-600"
        bgColor="bg-orange-600/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg 
              border w-full p-4 px-3 
              md:px-6 focus-within:shadow-sm
              grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none 
                      focus-visible:ring-0 focus-visible:ring-transparent w-full"
                        disabled={isLoading}
                        placeholder="Opisz jakie video ma wygenerować AI?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
                type="submit"
                size="icon"
              >
                Start
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-6">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader long={true} />
            </div>
          )}
          {!video && !isLoading && (
            <>
              <Empty label="Brak wygenerowanego video" type="video" />
              <GenerationExamples
                title="Przykładowe zapytania do generatora video"
                description="Możesz poprosić Geniusza o stworzenie dowolnego video. Po prostu opisz dokładnie. Poniżej znajdziesz przykłady."
                examples={examples}
              />
            </>
          )}

          {video && (
            <video
              controls
              className="w-full aspect-video mt-8 rounded-lg border bg-black"
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
      <p className="text-zinc-400 text-center text-xs mt-20">
        Wykonanie: Andrzej Herman - Software Developer
      </p>
    </div>
  );
};

export default VideoGenerationPage;
