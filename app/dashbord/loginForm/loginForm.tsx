"use client";
import { useState } from "react";
import { useActionState } from "react";
import { CreateLoginForm } from "../signupAction";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [state, formAction, isPending] = useActionState(CreateLoginForm, {
    success: false,
    error: "",
  });

  function handleSubmit(e: any) {
    if (password !== confirmPassword) {
      e.preventDefault();
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
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

        {passwordError && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
            {passwordError}
          </div>
        )}

        <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isPending ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
