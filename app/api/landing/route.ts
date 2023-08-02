import { NextResponse } from "next/server";
import { getLastPrompts } from "@/lib/genius-user";

export async function GET() {
  try {
    const prompts = await getLastPrompts();
    return NextResponse.json(prompts);
  } catch (error) {
    console.log("[CODE GENERATOR ERROR]", error);
    return new NextResponse("Internal error: Code Generator Error", {
      status: 500,
    });
  }
}
