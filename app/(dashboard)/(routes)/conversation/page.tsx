"use client";

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import GenerationExamples from "@/components/generation-examples";

const ConversationPage = () => {
  const chatData = [
    "napisz krótki tekst na temat czterech miast nad polskim Bałtykiem",
    "powiedz mi coś o historycznych stolicach Polski",
    "kto to jest hipochondryk?",
    "napisz esej na temat podróży dookoła świata",
    "jak się mnoży macierze?",
  ];

  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Czat AI"
        description="Najbardziej zaawansowany czat oparty na sztucznej inteligencji"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                        placeholder="Zapytaj o coś Geniusza lub po prostu rozpocznij rozmowę ..."
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
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <>
              <Empty label="Brak rozmów" type="conversation" />
              <GenerationExamples
                title="Przykładowe zapytania do czatu AI"
                description="Możesz zapytać Geniusza o cokolwiek lub nawiązać z nim rozmowę. Poniżej znajdziesz przykłady."
                examples={chatData}
              />
            </>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "py-8 px-10 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm text-justify">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-zinc-400 text-center text-xs mt-20">
        Wykonanie: Andrzej Herman - Software Developer
      </p>
    </div>
  );
};

export default ConversationPage;
