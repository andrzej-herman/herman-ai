import { stripe } from "@/lib/stripe";
import { NextResponse, NextRequest } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { absoluteUrl } from "@/lib/utils";

const successUrl = absoluteUrl("/dashboard");
const cancelUrl = absoluteUrl("/premiumplans");

const getSubscriptionType = (priceId: string): string => {
  if (priceId === "price_1NaCnSAbxb6ynim0pIjqasj0") return "Mikro";
  else if (priceId === "price_1NaCotAbxb6ynim0oQw5bYRT") return "Mini";
  else if (priceId === "price_1NaCq0Abxb6ynim0vXrX4F7F") return "Standard";
  else return "Premium";
};

const getTokens = (priceId: string): string => {
  if (priceId === "price_1NaCnSAbxb6ynim0pIjqasj0") return "5";
  else if (priceId === "price_1NaCotAbxb6ynim0oQw5bYRT") return "10";
  else if (priceId === "price_1NaCq0Abxb6ynim0vXrX4F7F") return "50";
  else return "100";
};


export const PREMIUM_PLANS = [
  {
    name: "Mikro",
    description: "5 tokenów Geniusz",
    price: "4.99",
    id: "price_1NaCnSAbxb6ynim0pIjqasj0",
  },
  {
    name: "Mini",
    description: "10 tokenów Geniusz",
    price: "7.99",
    id: "price_1NaCotAbxb6ynim0oQw5bYRT",
  },
  {
    name: "Standard",
    description: "50 tokenów Geniusz",
    price: "29.99",
    id: "price_1NaCq0Abxb6ynim0vXrX4F7F",
  },
  {
    name: "Premium",
    description: "100 tokenów Geniusz",
    price: "49.99",
    id: "price_1NaCr1Abxb6ynim0FmmNAlhe",
  },
];




export async function POST(req: NextRequest) {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let data = await req.json();
  let priceId = data.priceId as string;
  let subscriptionType = getSubscriptionType(priceId);
  let tokens = getTokens(priceId);
  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    payment_method_types: ["card", "blik", "p24"],
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
      subscriptionType: subscriptionType,
      numberOfTokens: tokens,
      stripePriceId: priceId,
    },
  });

  return NextResponse.json(session.url);
}
