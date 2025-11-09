import SideBar from "./sidebar";
import LoginForm from "./loginForm/loginForm";
import { cookies } from "next/headers";
import NavBar from "./navBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userid")?.value;
  console.log("[layout].userid", userId);

  if (!userId) {
    return <LoginForm />;
  }

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
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
