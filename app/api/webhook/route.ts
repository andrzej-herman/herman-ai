import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

// export async function POST(req: Request) {
//   const body = await req.text();
//   const signature = headers().get("Stripe-Signature") as string;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (error: any) {
//     console.log("[STRIPE WEBHOOK ERROR]", error.message);
//     return new NextResponse(`Stripe Webhook Error: ${error.message}`, {
//       status: 400,
//     });
//   }

//   const session = event.data.object as Stripe.Checkout.Session;
//   if (event.type === "checkout.session.completed") {
//     if (session.metadata!.userId)
//     )
//       session.subscription as string
//     );
//   }
// }







// model GeniusUser {
//   id String @id @default(cuid())
//   userId String @unique
//   freeTokensUsed Int @default(0)
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   isPro Boolean @default(false)
//   subscriptionType String?
//   stripePriceId String?
//   proTokenPurchased Int @default(0)
//   proTokensUsed Int @default(0)
//   proPurchaseDate DateTime?
// }