"use client";

import { useEffect, useState } from "react";
import NavBar from "./navBar";
import SideBar from "./sidebar";
import LoginForm from "./loginForm/loginForm";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  if (isLoggedIn === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="h-screen flex flex-col">
      <NavBar
        onLogout={() => {
          localStorage.removeItem("isLoggedIn");
          setIsLoggedIn(false);
        }}
      />
      <div className="flex flex-1">
        <div className="w-64 bg-gray-800 text-white">
          <SideBar />
        </div>
        <main className="flex-1 p-4 overflow-auto bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
