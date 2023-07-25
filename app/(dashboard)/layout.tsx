import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-80 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-80">
        <Navbar />
        {children}
        <footer className="absolute bottom-0">
          <div className="flex items-center justify-center p-4">
            <p className="text-xs text-gray-400 text-center">
              Developed by Andrzej Herman &copy; Społeczna Akademia Nauk w Łodzi
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardLayout;
