import Navbar from "./navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 overflow-auto bg-white ">
        {children}
      </main>
    </div>
  );
}
