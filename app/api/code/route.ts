import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { checkIfCanGenerate, increaseUsedTokens } from "@/lib/genius-user";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "Jesteś generatorem kodu. Możesz odpowiadać tylko w markdown code snippets. Używaj komentarzy, aby wyjaśnić kod.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("No messages. Messages are required", {
        status: 400,
      });
    }

    const canGenerate = await checkIfCanGenerate();

    if (!canGenerate) {
      return new NextResponse("Your prompts have expired", {
        status: 403,
      });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    await increaseUsedTokens();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CODE GENERATOR ERROR]", error);
    return new NextResponse("Internal error: Code Generator Error", {
      status: 500,
    });
  }
}
