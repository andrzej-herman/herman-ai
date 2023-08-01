"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import axios from "axios";
import { PREMIUM_PLANS } from "@/constants";

const PremiumPlans = () => {
  const handleCheckout = async (id: string) => {
    const { data } = await axios.post(
      "/api/checkout",
      { priceId: id },
      { headers: { "Content-Type": "application/json", 'Authorization': `secret_key: ${process.env.STRIPE_API_KEY}` } }
    );
    window.location.assign(data);
  };

  return (
    <div className="flex flex-col items-center justify-center py-7">
      <div className="flex flex-col items-center justify-center">
        <Image width={100} height={100} alt="Premium" src="/pro.png" />
        <div className="flex items-center mt-3">
          <p className="text-3xl font-bold">Geniusz</p>
          <Badge variant="premium" className="uppercase ml-3 py-1 px-3 text-lg">
            pro
          </Badge>
        </div>
      </div>

      <h2 className="text-center text-4xl font-bold mt-10 mb-3">
        Wybierz pakiet tokenów odpowiedni dla siebie
      </h2>
      <p className="mb-10 text-zinc-500 text-center">
        Pojedyńcze zapytanie do generatora zużywa 1 token. <br />
        Po zakupieniu tokenów będziesz miał/a dostęp do wszystkich pięciu
        generatorów AI. <br />
        W każdym pakiecie zakupione tokeny są ważne bezterminowo.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols:3 lg:grid-cols-4">
        {PREMIUM_PLANS.map((plan) => (
          <Card
            key={plan.name}
            className="bg-zinc-100 border-zinc-200 m-2 shadow-md"
          >
            <CardHeader>
              <Image alt="Geniusz" src="/mainlogo.png" width={40} height={40} />
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-2xl">{plan.name}</p>
                  <p className="text-sm text-zinc-500">{plan.description}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0 font-bold text-indigo-700">
                <p className="text-4xl tracking-tighter">
                  {plan.price}{" "}
                  <span className="text-sm tracking-tight">PLN</span>
                </p>
              </CardContent>
              <Button variant="premium" onClick={() => handleCheckout(plan.id)}>
                Wybieram i płacę
              </Button>
              <p className="text-xs text-zinc-400 text-center">
                Po wyborze przejdziesz do strony płatności
              </p>
            </CardHeader>
          </Card>
        ))}
      </div>
      <h5 className="text-zinc-500 mt-6">
        Płatności są obsługiwane przez Stripe
      </h5>
      <p className="text-zinc-400 text-center text-xs mt-20">Wykonanie: Andrzej Herman - Software Developer</p>
    </div>
  );
};

export default PremiumPlans;


