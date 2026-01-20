import { submitCheckout } from "./checkoutAction";

export default function CheckoutFormPage() {
  return (
    <form
      action={submitCheckout}
      className="space-y-6 bg-green-200 from-purple-50 to-purple-100 p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-purple-700 mb-4">
        Shipping Information
      </h2>

      <input
        name="fullName"
        placeholder="Full Name"
        className="w-full border border-purple-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 p-3 rounded-lg transition-all"
      />

      <textarea
        name="address"
        placeholder="Address"
        className="w-full border border-purple-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 p-3 rounded-lg transition-all"
        rows={3}
      />

      <input
        name="postcode"
        placeholder="Postcode"
        className="w-full border border-purple-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 p-3 rounded-lg transition-all"
      />

      <input
        name="phone"
        placeholder="Phone"
        className="w-full border border-purple-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 p-3 rounded-lg transition-all"
      />

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all transform hover:scale-105"
      >
        Continue to Payment
      </button>
    </form>
  );
}
