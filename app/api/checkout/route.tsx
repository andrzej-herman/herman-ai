import { stripe } from "@/lib/stripe";
import { NextResponse, NextRequest } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { absoluteUrl } from "@/lib/utils";

const successUrl = absoluteUrl("/dashboard");
const cancelUrl = absoluteUrl("/premiumplans");

const getSubscriptionType = (priceId: string) => {
  if (priceId === "price_1NZGvzAbxb6ynim0Qkl8ADH5") return "Mikro";
  else if (priceId === "price_1NZGzHAbxb6ynim00sMSsQv6") return "Mini";
  else if (priceId === "price_1NZH3XAbxb6ynim0UJLNxUpB") return "Standard";
  else return "Premium";
};

const getTokens = (priceId: string) => {
  if (priceId === "price_1NZGvzAbxb6ynim0Qkl8ADH5") return 5;
  else if (priceId === "price_1NZGzHAbxb6ynim00sMSsQv6") return 10;
  else if (priceId === "price_1NZH3XAbxb6ynim0UJLNxUpB") return 50;
  else return 100;
};

export async function POST(req: NextRequest) {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let data = await req.json();
  let priceId = data.priceId;
  let subscriptionType = getSubscriptionType(priceId);
  let tokens = getTokens(priceId);
  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    payment_method_types: ["card", "paypal", "blik", "p24"],
    mode: "payment",
    billing_address_collection: "auto",
    customer_email: user.emailAddresses[0].emailAddress,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      subscriptionType,
      numberOfTokens: tokens,
    },
  });

  return NextResponse.json(session.url);
}
