import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.log("[STRIPE WEBHOOK ERROR]", error.message);
    return new NextResponse(`Stripe Webhook Error: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    if (
      !session?.metadata?.userId ||
      !session?.metadata?.subscriptionType ||
      !session?.metadata?.numberOfTokens ||
      !session?.metadata?.stripePriceId
    ) {
      return new NextResponse("Stripe Webhook Error: No metadata details", {
        status: 400,
      });
    }

    let userId = "";
    if (session) {
      if (session.metadata) {
        let ui = session.metadata.userId;
        userId = ui;
      }
    }

    session?.metadata?.userId;
    let subscriptionType = session?.metadata?.ssubscriptionType;
    let numberOfTokens = 0;
    if (session) {
      if (session.metadata) {
        let t = session.metadata.numberOfTokens;
        numberOfTokens = parseInt(session.metadata.numberOfTokens);
      }
    }

    let stripePriceId = session?.metadata?.stripePriceId;

    const geniusUser = await prismadb.geniusUser.findUnique({
      where: {
        userId,
      },
    });

    if (geniusUser) {
      await prismadb.geniusUser.update({
        where: { userId: userId },
        data: {
          isPro: true,
          proTokensUsed: 0,
          proTokenPurchased: numberOfTokens,
          stripePriceId: stripePriceId,
          subscriptionType: subscriptionType,
          proPurchaseDate: new Date(),
        },
      });
    } else {
      await prismadb.geniusUser.create({
        data: {
          userId: userId,
          freeTokensUsed: 0,
          isPro: true,
          subscriptionType: subscriptionType,
          stripePriceId: stripePriceId,
          proTokenPurchased: numberOfTokens,
          proTokensUsed: 0,
          proPurchaseDate: new Date(),
        },
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}
