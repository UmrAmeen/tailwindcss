"use client";
import { useState, useEffect } from "react";
import SideBar from "./sidebar";
import NavBar from "./navBar";
import Login from "./loginForm/page";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) return <Login onSuccess={handleLoginSuccess} />;

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1">
        <div className="w-54 bg-gray-600 text-white h-full rounded-lg">
          <SideBar />
        </div>
        <main className="flex-1 p-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

