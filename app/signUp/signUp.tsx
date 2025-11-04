"use client";

import { useActionState } from "react";
import { CreateSignUpForm } from "../signupAction";
import Link from "next/link";

export default function SignUp() {
  const [state, formAction, isPending] = useActionState(CreateSignUpForm, {
    success: false,
    error: "",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Create Account
        </h1>

        {state.success && (
          <div className="p-3 text-green-800 bg-green-100 rounded-lg text-center font-medium">
            Signup successful!
          </div>
        )}
        {state.error && (
          <div className="p-3 text-red-800 bg-red-100 rounded-lg text-center font-medium">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link
            href="/dashboard"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
