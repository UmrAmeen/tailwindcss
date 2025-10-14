"use client";

import {
  addItem,
  buyCart,
  removeItem,
  decreaseItem,
} from "../shopingCartAction";
import { useState } from "react";

interface RowType {
  [key: string]: any;
}

export default function ShoppingCart({ cart }: { cart: RowType[] }) {
  const [loading, setLoading] = useState(false);

  const handleAdd = async (id: number) => {
    await addItem(id);
  };

  const handleDecrease = async (id: number) => {
    await decreaseItem(id);
  };

  const handleRemove = async (id: number) => {
    await removeItem(id);
  };

  const handleBuy = async () => {
    const confirmed = confirm("Are you sure you want to buy these items?");
    if (!confirmed) return;
    setLoading(true);
    await buyCart(cart);

    setLoading(false);
  };
  const total = cart.reduce(
    (sum: number, item: RowType) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="space-y-4">
      {cart.length === 0 ? (
        <p className="text-red-500 font-bold">Your cart is empty!!</p>
      ) : (
        <>
          {cart.map((item: RowType) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-md shadow-sm gap-4"
            >
              <div className="flex flex-[2] items-center gap-4">
                <img
                  src={item.base64Image}
                  alt={item.product_name}
                  className="w-[84px] h-auto object-cover rounded"
                />
                <p className="font-medium">{item.product_name}</p>
              </div>

              <div className="flex-1 flex items-center gap-2">
                <button
                  onClick={() => handleDecrease(item.id)}
                  className={`px-2 py-1 border rounded text-sm ${
                    item.quantity <= 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleAdd(item.id)}
                  className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <div className="flex-1 text-green-600 font-medium">
                Price: ${item.price.toFixed(2)}
              </div>

              <div className="flex-1 text-green-600 font-medium">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </div>

              <div className="w-[80px]">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:text-red-800 hover:bg-gray-100 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-xl font-semibold text-red-400">
              Total: ${total.toFixed(2)}
            </p>

            <button
              onClick={handleBuy}
              className="bg-purple-600 text-white px-4 py-2 rounded mt-4 hover:bg-purple-700"
              disabled={loading}
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
