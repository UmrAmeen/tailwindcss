"use client";

import { useActionState } from "react";
import { CreateSignUpForm } from "../signupAction";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(CreateSignUpForm, {
    success: false,
    error: "",
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-300 rounded shadow ">
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
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            name="phoneNumber"
            id="phoneNumber"
            type="tel"
            placeholder="Phone number"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-gray-900"
          disabled={isPending}
          formAction={formAction}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
