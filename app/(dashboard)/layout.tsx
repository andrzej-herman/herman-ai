import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-80">
        <Navbar />
        {children}
      </main>
      <footer className="bottom-0 ml-0 md:ml-72 mt-6">
        <div className="flex items-center justify-center p-4">
          <p className="text-xs text-gray-400 text-center">
            Wykonanie: Andrzej Herman &copy; Społeczna Akademia Nauk w Łodzi
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
