"use client";

import LandingContent from "@/components/landing-content";
import LandingHero from "@/components/landing-hero";
import LandingNavbar from "@/components/landing-navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

interface LastPrompt {
  lp: number;
  text: String;
  type: String;
}

const LandingPage = () => {
  const [prompts, setPrompts] = useState<LastPrompt[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/landing");
      setPrompts(response.data);
    };

    fetchData();
  }, []);

  console.log(prompts);

  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
      {prompts.length > 0 ? (
        <div className="px-10 pb-20">
          <h2 className="text-center text-4xl text-white font-extrabold mb-10">
            Ostatnie zapytania użytkowników do Geniusza
          </h2>
          <div>
            {prompts.slice(1).map((item) => (
              <div
                key={item.lp}
                className="flex items-center justify-between mb-2 gap-3"
              >
                <Card className="bg-[#192339] border-none text-white w-16 flex-auto">
                  <CardContent className="text-sm py-4 ">{item.lp}</CardContent>
                </Card>
                <Card className="bg-[#192339] border-none text-white w-full">
                  <CardContent className="text-sm py-4 italic">
                    {item.text}
                  </CardContent>
                </Card>
                <Card className="bg-[#192339] border-none text-white w-52 flex-auto">
                  <CardContent className="text-sm py-4 text-blue-500 font-bold">
                    {item.type}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="py-6">
        <p className="text-zinc-400 text-center text-xs ">
          Wykonanie: Andrzej Herman - Software Developer
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
