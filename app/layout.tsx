
import "./globals.css";
import SideBar from "./sidebar";
import NavBar from "./navBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <div>
          <NavBar />
        </div>

        <div className="flex flex-1">
          <div className="w-54 bg-gray-600 text-white h-full rounded-lg">
            <SideBar />
          </div>

          <main className="flex-1 p-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
