import LandingContent from "@/components/landing-content";
import LandingHero from "@/components/landing-hero";
import LandingNavbar from "@/components/landing-navbar";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent/>
      <p className="text-zinc-400 text-center text-xs">Wykonanie: Andrzej Herman - Software Developer</p>
    </div>
  );
};

export default LandingPage;
