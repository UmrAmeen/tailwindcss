import CartSummary from "./cartSummary";
import CheckoutFormPage from "./checkoutform";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-10 px-4">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-10 text-center">
        Checkout
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <CheckoutFormPage />
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-400 p-6 rounded-2xl shadow-xl sticky top-20">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
