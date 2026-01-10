"use client";
import { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { CreateLoginForm } from "../signupAction";

export default function LoginForm() {
  const [state, setState] = useState({ success: false, error: "" });
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await CreateLoginForm(formData);
    setState(result);

    setIsPending(false);
  };

  return (
    <div className="flex  items-center justify-center min-h-screen text-white">
      <div className="bg-white border border-black p-8 rounded-lg shadow-md w-96 text-black">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {state.error && <div className="text-red-500 mb-4">{state.error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <Link href="/signUp" className="text-blue-500 ">
          <p className="w-full text-center mt-5 bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Sign Up
          </p>
        </Link>
      </div>
    </div>
  );
}
