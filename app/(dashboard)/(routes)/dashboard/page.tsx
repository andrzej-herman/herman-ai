import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <>
      <div className="text-6xl text-red-500">Dashboard (Protected)</div>
      <div className="mt-2 ml-2">
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default DashboardPage;
