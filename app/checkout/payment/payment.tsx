"use client";
import { useState } from "react";
import { handlePayment } from "./paymentAction";

export default function PaymentForm({ billing, cartItems }: any) {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await handlePayment();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-2xl space-y-8"
      >
        <h1 className="text-3xl font-extrabold text-purple-700 text-center">
          Payment Details
        </h1>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
            Billing Info
          </h2>
          <p className="text-gray-700">
            <span className="font-medium">Name:</span> {billing.fullName}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Address:</span> {billing.address}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
            Cart Items
          </h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {cartItems.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-200 py-2"
              >
                <span className="text-gray-700 font-medium">
                  {item.name || `Product ID: ${item.productId}`}
                </span>
                <span className="text-gray-700 font-semibold">
                  Qty: {item.quantity}
                </span>
              </div>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all transform hover:scale-105 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
