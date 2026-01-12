"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { addToCart } from "./addtocartAction";

export default function AddToCartButton({
  productId,
  cartQuantity,
  onRequireLogin,
}: {
  productId: number;
  cartQuantity: number;
  onRequireLogin: () => void;
}) {
  const [quantity, setQuantity] = useState(cartQuantity || 1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const router = useRouter();
  const handleIncrease = () => {
     console.log("handleIncrease called");
    if (loading) return;
    setQuantity((q) => q + 1);
  };

  const handleAddToCart = async () => {
    setLoading(true);
    setStatus("");
    const result = await addToCart(productId, quantity);

    if (!result.success) {
      onRequireLogin();
      setLoading(false);
      return;
    }
    setStatus("Cart updated");
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="mt-3 flex items-center space-x-3">
      <span className="font-medium text-gray-800">Quantity: {quantity}</span>

      <button
        onClick={handleIncrease}
        disabled={loading}
        className="px-3 py-2 bg-gray-900 text-white rounded"
      >
        +
      </button>

      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Submitting..." : "Add to Cart"}
      </button>
      {status && <p className="text-sm">{status}</p>}
    </div>
  );
}
