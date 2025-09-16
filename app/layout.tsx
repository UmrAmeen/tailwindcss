// app/layout.tsx or app/layout.js
import "./globals.css";
import SideBar from "./sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <div className="w-54 h-screen bg-gray-600 text-white top-0 left-0 ">
            <SideBar />
          </div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
