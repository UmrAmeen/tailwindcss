import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export default function ThemeContextProvider({ children }:any) {
  const [state, setState] = useState("dark");

  function toggleTheme() {
    setState("dark");
  }

  return (
    <ThemeContext value={{ value: state, toggleTheme }}>
      {children}
    </ThemeContext>
  );
}
