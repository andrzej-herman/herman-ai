"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypeWriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <h4 className="text-slate-400 text-md">
        Twórz teksty, obrazy, muzykę, video i kod źródłowy aplikacji
        wykorzystując sztuczną inteligencję
      </h4>
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Generator treści AI do</h1>
        <div
          className="text-transparent bg-clip-text bg-gradient-to-r
               from-purple-400 to-pink-600
       "
        >
          <TypeWriterComponent
            options={{
              strings: [
                "tworzenia tekstów.",
                "tworzenia obrazów.",
                "tworzenia video.",
                "tworzenia muzyki.",
                "tworzenia kodu źródłowego.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Wykorzystaj potęgę sztucznej inteligencji do nauki, zabawy i jako pomoc
        w szkole lub na studiach.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold mt-4"
          >
            Rozpocznij bezpłatnie
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        Wypróbuj bez opłat !!!
      </div>
    </div>
  );
};

export default LandingHero;
