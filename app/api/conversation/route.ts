import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { checkIfCanGenerate, increaseUsedTokens } from "@/lib/genius-user";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

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
      messages,
    });

    await increaseUsedTokens();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CHAT AI ERROR]", error);
    return new NextResponse("Internal error: Chat AI Error", { status: 500 });
  }
}
