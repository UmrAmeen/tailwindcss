import SideBar from "./sidebar";
import NavBar from "./dashboardNavBar";
import { supabase } from "../lib/supabaseClient";
import Login from "../public/login/page";
import DashboardNavBar from "./dashboardNavBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <Login />;
  }

  return (
    <div className="h-screen flex flex-col">
      <DashboardNavBar />

      <div className="flex flex-1">
        <div className="w-64 bg-gradient-to-r from-blue-400 to-purple-400 text-white">
          <SideBar />
        </div>

        <main className="flex-1 p-4 overflow-auto bg-gradient-to-r from-green-300 to-red-300">
          {children}
        </main>
      </div>
    </div>
  );
}
