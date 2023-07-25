import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <div className="text-6xl text-green-500">Landing Page (Unprotected)</div>
      <div className="mt-2 ml-2">
        <Link href="sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="sign-up" className="ml-2">
          <Button>Register</Button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
