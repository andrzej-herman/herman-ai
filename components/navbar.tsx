import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";
import {
  checkIfPro,
  freeTokensUsed,
  proTokensUsed,
  proTokensPurchased,
} from "@/lib/genius-user";

const Navbar = async () => {
  const pro = await checkIfPro();
  const free = await freeTokensUsed();
  const proUsed = await proTokensUsed();
  const purchased = await proTokensPurchased();
  return (
    <div className="flex items-center p-4">
      <MobileSidebar
        isPro={pro}
        freeTokensUsed={free}
        proTokensUsed={proUsed}
        proTokensPurchased={purchased}
      />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
