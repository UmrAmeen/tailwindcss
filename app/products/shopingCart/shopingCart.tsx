"use client";

import { useState, useTransition } from "react";
import { buyCartItems } from "../addtocart";

interface RowType {
  [key: string]: any;
}
export default function ShoppingCart({ products }: any) {
  const [cart, setCart] = useState<RowType[]>([]);
  const [loading, setLoading] = useState(false);

  const addToCart = (product: RowType) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, qty: item.qty! - 1 } : item
        )
        .filter((item) => item.qty! > 0)
    );
  };
  const handleBuy = async () => {
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }
    setLoading(true);

    const result = await buyCartItems(cart);

    if (result.success) {
      alert("Purchase successful!");
      setCart([]);
    } else {
      alert(result.message || "Purchase failed.");
    }
    setLoading(false);
  };

  const total = cart
    .reduce((total, item) => total + item.price * (item.qty || 1), 0)
    .toFixed(2);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-red-700">🛒 Shopping Cart</h1>

      <section className="mb-10 ">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {products.map((product: RowType) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 flex flex-col items-center shadow-sm bg-green-400"
            >
              <img
                src={product.base64Image}
                alt={product.name}
                className="w-24 h-24 object-cover mb-4"
              />
              <div className="text-center">
                <p className="font-semibold">{product.name}</p>
                <p className="text-gray-600 mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {item.name} × {item.qty}
                  </p>
                  <p className="text-green-600 font-bold">
                    ${(item.price * (item.qty || 1)).toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <h3 className="text-xl font-bold mt-8 text-red-400">Total: ${total}</h3>
      <button
        onClick={handleBuy}
        className="bg-purple-600 text-white px-4 py-2 rounded mt-4 hover:bg-purple-700"
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </div>
  );
}
