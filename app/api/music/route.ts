import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkIfCanGenerateVideoAndMusic, increaseUsedTokens } from "@/lib/genius-user";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("No prompt provided. Prompt is required", {
        status: 400,
      });
    }

    const canGenerate = await checkIfCanGenerateVideoAndMusic();

    if (!canGenerate) {
      return new NextResponse("Only pro users can generate music", {
        status: 402,
      });
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    await increaseUsedTokens();

    return NextResponse.json(response);
  } catch (error) {
    console.log("[MUSIC GENERATION ERROR]", error);
    return new NextResponse("Internal error: Music Generation Error", {
      status: 500,
    });
  }
}
