import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const PremiumPlans = () => {
  return (
    <div className="flex flex-col items-center justify-center py-7">
      <div className="flex flex-col items-center justify-center">
        <Image width={60} height={60} alt="Premium" src="/pro.png" />
        <div className="flex items-center">
          <p className="text-2xl font-bold ml-2">Geniusz</p>
          <Badge variant="premium" className="uppercase ml-2 py-1 px-2">
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
        Zakupione tokeny są ważne bezterminowo.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols:3 lg:grid-cols-4">
        <Card className="bg-zinc-200 border-zinc-200 m-2">
          <CardHeader>
            <Image alt="Geniusz" src="/mainlogo.png" width={40} height={40} />
            <CardTitle className="flex items-center gap-x-2">
              <div>
                <p className="text-2xl">Mikro</p>
                <p className="text-sm text-zinc-500">
                  Pakiet 5 tokenów Geniusz
                </p>
              </div>
            </CardTitle>
            <CardContent className="pt-4 px-0 font-bold text-emerald-600">
              <p className="text-4xl ">
                4.99 <span className="text-sm">PLN</span>
              </p>
            </CardContent>
            <Button variant="premium">Wybieram i płacę</Button>
            <p className="text-xs text-zinc-400">
              Po wyborze przejdziesz do strony płatności
            </p>
          </CardHeader>
        </Card>
        <Card className="bg-zinc-200 border-zinc-200 m-2">
          <CardHeader>
            <Image alt="Geniusz" src="/mainlogo.png" width={40} height={40} />
            <CardTitle className="flex items-center gap-x-2">
              <div>
                <p className="text-2xl">Mini</p>
                <p className="text-sm text-zinc-500">
                  Pakiet 10 tokenów Geniusz
                </p>
              </div>
            </CardTitle>
            <CardContent className="pt-4 px-0 font-bold text-emerald-600">
              <p className="text-4xl ">
                7.99 <span className="text-sm">PLN</span>
              </p>
            </CardContent>
            <Button variant="premium">Wybieram i płacę</Button>
            <p className="text-xs text-zinc-400">
              Po wyborze przejdziesz do strony płatności
            </p>
          </CardHeader>
        </Card>
        <Card className="bg-zinc-200 border-zinc-200 m-2">
          <CardHeader>
            <Image alt="Geniusz" src="/mainlogo.png" width={40} height={40} />
            <CardTitle className="flex items-center gap-x-2">
              <div>
                <p className="text-2xl">Standard</p>
                <p className="text-sm text-zinc-500">
                  Pakiet 50 tokenów Geniusz
                </p>
              </div>
            </CardTitle>
            <CardContent className="pt-4 px-0 font-bold text-emerald-600">
              <p className="text-4xl ">
                29.99 <span className="text-sm">PLN</span>
              </p>
            </CardContent>
            <Button variant="premium">Wybieram i płacę</Button>
            <p className="text-xs text-zinc-400">
              Po wyborze przejdziesz do strony płatności
            </p>
          </CardHeader>
        </Card>
        <Card className="bg-zinc-200 border-zinc-200 m-2">
          <CardHeader>
            <Image alt="Geniusz" src="/mainlogo.png" width={40} height={40} />
            <CardTitle className="flex items-center gap-x-2">
              <div>
                <p className="text-2xl">Premium</p>
                <p className="text-sm text-zinc-500">
                  Pakiet 100 tokenów Geniusz
                </p>
              </div>
            </CardTitle>
            <CardContent className="pt-4 px-0 font-bold text-emerald-600">
              <p className="text-4xl ">
                49.99 <span className="text-sm">PLN</span>
              </p>
            </CardContent>
            <Button variant="premium">Wybieram i płacę</Button>
            <p className="text-xs text-zinc-400">
              Po wyborze przejdziesz do strony płatności
            </p>
          </CardHeader>
        </Card>
      </div>
      <h5 className="text-zinc-500 mt-6">
        Płatności są obsługiwane przez Stripe
      </h5>
    </div>
  );
};

export default PremiumPlans;

// 4.99 PLN Pakiet 5 tokenów => Mikro
// 7.99 PLN Pakiet 10 tokenów => Mini
// 29.99 PLN Pakiet 50 tokenów. => Standard (najczęściej wybierany)
// 49.99 PLN Pakiet 100 tokenów. => Premium
