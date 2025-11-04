"use client";
import { useActionState, useState } from "react";
import { CreateSignUpForm } from "../signupAction";

export default function SignUpForm() {
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
  const [state, formAction, isPending] = useActionState(CreateSignUpForm, {
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-300 rounded shadow ">
      <h1 className="mb-4 p-2 bg-blue-200 text-center text-xl text-blue-800 rounded">
        signUp Form
      </h1>
      {state.success ? (
        <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
          Signup successful!
        </div>
      ) : state.error ? (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
          {state.error}
        </div>
      ) : null}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Name"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            passord
          </label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="password"
            className="w-full border rounded px-3 py-2"
            required
            autoComplete="new-password"
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-gray-900"
          disabled={isPending}
          formAction={formAction}
        >
          SIGNIN
        </button>
      </form>
    </div>
  );
}
