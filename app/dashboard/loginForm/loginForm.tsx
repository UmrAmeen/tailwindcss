"use client";
import { useEffect } from "react";
import { useActionState } from "react";
import { CreateLoginForm } from "../../signupAction";
import Link from "next/link";

export default function LoginForm({ onLogin }: any) {
  const [state, formAction, isPending] = useActionState(CreateLoginForm, {
    success: false,
    error: "",
  });

  useEffect(() => {
    if (state.success) {
      localStorage.setItem("isLoggedIn", "true");
      onLogin();
    }
  }, [state.success, onLogin]);

  return (
    <div className="flex items-center justify-center min-h-screen  text-white">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-black">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {state.error && <div className="text-red-500 mb-4">{state.error}</div>}

        <form action={formAction} className="space-y-4">
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
            signup
          </p>
        </Link>
      </div>
    </div>
  );
}
