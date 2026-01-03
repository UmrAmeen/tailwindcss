"use client";
import { useState } from "react";
import {
  addItem,
  buyCart,
  removeItem,
  decreaseItem,
} from "../shopingCartAction";

export default function ShoppingCart({ cart }:any) {
  const [loading, setLoading] = useState(false);

  const handleAdd = async (cartId: number) => {
    await addItem(cartId);
  };

  const handleDecrease = async (cartId: number) => {
    await decreaseItem(cartId);
  };

  const handleRemove = async (cartId: number) => {
    await removeItem(cartId);
  };

  const handleBuy = async () => {
    if (!confirm("Are you sure you want to buy these items?")) return;
    setLoading(true);
    await buyCart(cart);
    setLoading(false);
  };

  const total = cart.reduce(
    (sum:any, item:any) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="space-y-4">
      {cart.length === 0 ? (
        <p className="text-red-500 font-bold">Your cart is empty!!</p>
      ) : (
        <>
          {cart.map((item:any) => {
            const price = Number(item.price);

            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between p-4 border border-purple-500 rounded-md gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.base64Image ?? "/no-image.png"}
                    alt={item.product_name}
                    className="w-[84px] rounded"
                  />
                  <p className="font-medium text-green-600">
                    {item.product_name}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 border rounded text-green-600 disabled:text-gray-500"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => handleAdd(item.id)}
                    className="px-2 py-1 border rounded text-green-600"
                  >
                    +
                  </button>
                </div>

                <div className="text-green-600">
                  Price: ${price.toFixed(2)}
                </div>

                <div className="text-green-600">
                  Total: ${(price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 font-semibold"
                >
                  Remove
                </button>
              </div>
            );
          })}

          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-xl font-semibold text-red-400">
              Total: ${total.toFixed(2)}
            </p>

            <button
              onClick={handleBuy}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
