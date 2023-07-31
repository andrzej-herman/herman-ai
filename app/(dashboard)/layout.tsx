import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import {
  checkIfPro,
  freeTokensUsed,
  proTokensUsed,
  proTokensPurchased,
} from "@/lib/genius-user";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const pro = await checkIfPro();
  const freeUsed = await freeTokensUsed();
  const proUsed = await proTokensUsed();
  const purchased = await proTokensPurchased();

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar
          isPro={pro}
          freeTokensUsed={freeUsed}
          proTokensUsed={proUsed}
          proTokensPurchased={purchased}
        />
      </div>
      <main className="md:pl-80">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
