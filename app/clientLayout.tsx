"use client";
import { useEffect, useState } from "react";
import SideBar from "./sidebar";
import NavBar from "./navBar";
import Login from "./loginForm/page";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem("loggedIn");
  //   if (loggedIn === "true") setIsLoggedIn(true);
  // }, []);
  
  function handleLoginSuccess() {
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
  }

  return (
    <div>
      {!isLoggedIn ? (
        <Login onSuccess={handleLoginSuccess} />
      ) : (
        <div className="h-screen flex flex-col">
          <NavBar />
          <div className="flex flex-1">
            <div className="w-54 bg-gray-600 text-white h-full rounded-lg">
              <SideBar />
            </div>
            <main className="flex-1 p-1 overflow-auto">{children}</main>
          </div>
        </div>
      )}
    </div>
  );
}
