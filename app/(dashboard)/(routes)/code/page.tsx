"use client";

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Code, Divide } from "lucide-react";
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
import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/use-pro-modal";
import GenerationExamples from "@/components/generation-examples";

const CodeGenerationPage = () => {
  const codeData = [
    "metoda zwracająca pierwsze 40 elementów ciągu Fibonnaciego w języku Python",
    "toggle button hook napisany w React z użyciem języka typescript",
    "sortowanie bąbelkowe w języku Java",
    "połaczenie do bazy danych sql-server w języku Go",
    "przykładowa klasa Produkt z typowymi właściwościami i metodami w języku C#",
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

      const response = await axios.post("/api/code", {
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
        title="Generowanie kodu aplikacji"
        description="Generuj poprawny kod źródłowy w dowolnym języku programowania używając opisu tekstowego"
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                        placeholder="Jak kod chcesz wygenerować?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 lg:col-span-2 w-full px-3"
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
              <Empty label="Brak wygenerowanego kodu" />
              <GenerationExamples
                title="Przykładowe zapytania o kod aplikacji"
                description="Możesz wygenerować dowolny kod w dowolnym języku programowania. Poniżej znajdziesz przykłady zapytań."
                examples={codeData}
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
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content || ""}
                </ReactMarkdown>
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

export default CodeGenerationPage;
