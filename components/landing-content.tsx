"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const opinions = [
  {
    name: "Tomek Strzelczyk",
    avatar: "TS",
    title: "student",
    description:
      "Szybko generuje teksty które potrzebuję. Gdy czegoś nie wiem zawsze mogę się zapytać i dostaję wyczerpującą odpowiedź. Polecam !!!",
  },
  {
    name: "Kacper Bryński",
    avatar: "KB",
    title: "uczeń",
    description:
      "Super !!! Wykorzystuję to narzędzie do przygotowywania się do klasówek i testów. Zawsze pomaga.",
  },
  {
    name: "Julia Wójt",
    avatar: "JW",
    title: "początkująca programistka",
    description:
      "Kurczę, w każdym jezyku programowania generuje poprawny kod. Ostatnio uczę się Pythona i ten generator jest nie do zastąpienia.",
  },
  {
    name: "Bartek Niepsuj",
    avatar: "BN",
    title: "student",
    description:
      "Geniusz jest dużo lepszy niż Chat GPT. Jest po polsku i jest dużo prostszy w obsłudze. Wersje płatne atrakcyjne cenowo.",
  },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Opinie użytkowników
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols:3 lg:grid-cols-4">
        {opinions.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white m-2"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-sm text-zinc-400">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0 text-sm italic">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
