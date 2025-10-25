"use client";
import { useActionState, useEffect } from "react";
import { CreateLoginForm } from "../signupAction";

export default function Login({ onSuccess }: { onSuccess: () => void }) {
  const [state, formAction, isPending] = useActionState(CreateLoginForm, {
    success: false,
    error: "",
  });

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  if (state.success) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        {state.error && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
            {state.error}
          </div>
        )}
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
