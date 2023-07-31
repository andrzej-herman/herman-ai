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
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    await increaseUsedTokens();

    return NextResponse.json(response);
  } catch (error) {
    console.log("[VIDEO GENERATION ERROR]", error);
    return new NextResponse("Internal error: Video Generation Error", {
      status: 500,
    });
  }
}
