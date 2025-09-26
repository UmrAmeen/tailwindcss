"use client";

import { useState } from "react";
import { addToCart } from "../addtocart";

export default function AddToCartButton({
  productId,
  cartQuantity,
}: {
  productId: number;
  cartQuantity: number;
}) {
  const [quantity, setQuantity] = useState(cartQuantity || 1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleIncrease = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleAddToCart = async () => {
    setLoading(true);
    const result = await addToCart(productId, quantity);
    setStatus(result.success ? " Cart updated" : " Error");
    setLoading(false);
  };

  return (
    <div className="mt-3 space-x-3 flex items-center">
      <span className="font-medium text-gray-800">Quantity: {quantity}</span>

      <button
        onClick={handleIncrease}
        disabled={loading}
        className="px-3 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 disabled:opacity-50"
      >
        +
      </button>

      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Add to Cart"}
      </button>

      {status && <p className="text-sm mt-2">{status}</p>}
    </div>
  );
}
