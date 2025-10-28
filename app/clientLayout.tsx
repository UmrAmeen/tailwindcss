"use client";
import { useState } from "react";
import SideBar from "./sidebar";
import NavBar from "./navBar";
import Login from "./loginForm/loginForm";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogin, setIsLogin] = useState(false);

  function handleLoginSuccess() {
    setIsLogin(true);
  }
 
  
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1">
        <div className="w-64 bg-gray-600 text-white h-full rounded-lg">
          <SideBar />
        </div>
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
