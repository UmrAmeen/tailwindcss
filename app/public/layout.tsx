import Navbar from "./navbar";
import ThemeContextProvider from "./ThemeContext";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContextProvider>
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <Navbar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </ThemeContextProvider>
  );
}
