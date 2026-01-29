"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addItem, decreaseItem, removeItem } from "../public/shopingCartAction";

export default function ShoppingCart({ cart }: any) {
  const [itemLoading, setItemLoading] = useState<number | null>(null);
  const router = useRouter();

  const handleAdd = async (cartId: number) => {
    if (itemLoading !== null) return;
    setItemLoading(cartId);
    await addItem(cartId);
    setItemLoading(null);
  };

  const handleDecrease = async (cartId: number) => {
    if (itemLoading !== null) return;
    setItemLoading(cartId);
    await decreaseItem(cartId);
    setItemLoading(null);
  };

  const handleRemove = async (cartId: number) => {
    if (itemLoading !== null) return;
    setItemLoading(cartId);
    await removeItem(cartId);
    setItemLoading(null);
  };

  const total = cart.reduce((sum: number, item: any) => {
    const price = Number(item.price ?? 0);
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="space-y-6">
      {cart.length === 0 ? (
        <p className="text-red-500 font-bold">Your cart is empty!</p>
      ) : (
        <>
          {cart.map((item: any) => {
            const disabled = itemLoading === item.id;
            const price = Number(item.price ?? 0);

            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-md shadow-sm gap-4"
              >
                <div className="flex flex-[2] items-center gap-4">
                  <img
                    src={item.base64Image ?? "/no-image.png"}
                    alt={item.product_name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <p className="font-medium text-gray-800">
                    {item.product_name}
                  </p>
                </div>

                <div className="flex-1 flex items-center gap-2">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    disabled={item.quantity <= 1 || disabled}
                    className={`px-2 py-1 border rounded text-green-600 text-sm ${
                      item.quantity <= 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleAdd(item.id)}
                    disabled={disabled}
                    className="px-2 py-1 border rounded text-green-600 text-sm hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <div className="flex-1 text-green-600 font-medium">
                  Price: ${price.toFixed(2)}
                </div>

                <div className="flex-1 text-green-600 font-medium">
                  Total: ${(price * item.quantity).toFixed(2)}
                </div>

                <div className="w-[80px]">
                  <button
                    onClick={() => handleRemove(item.id)}
                    disabled={disabled}
                    className="text-red-600 hover:text-red-800 font-semibold hover:bg-gray-100 text-sm rounded px-2 py-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t pt-4 gap-4">
            <p className="text-xl font-semibold text-red-500">
              Total: ${total.toFixed(2)}
            </p>
            <button
              onClick={() => router.push("/checkout")}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
