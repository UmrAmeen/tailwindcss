"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
  value: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state === "dark");
  }, [state]);

  const toggleTheme = () => {
    setState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ value: state, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
