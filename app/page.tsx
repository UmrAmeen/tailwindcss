"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center bg-gray-500">
        <p className="text-3xl font-bold mb-6">Welcome to my app</p>

        <Link
          href="/dashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Dashboard
          {/* {process.env.NEXT_PUBLIC_DB_PASSWORD} */}
        </Link>
      </main>
    </div>
  );
}
