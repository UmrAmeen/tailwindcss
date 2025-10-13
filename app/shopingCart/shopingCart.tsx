"use client";
import {
  addItem,
  buyCart,
  removeItem,
  decreaseItem,
} from "../shopingCartAction";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface RowType {
  [key: string]: any;
}

export default function ShoppingCart({ cart }: { cart: RowType[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleAdd = async (id: number) => {
    await addItem(id);
    router.refresh();
  };

  const handleDecrease = async (id: number) => {
    await decreaseItem(id);
    router.refresh();
  };

  const handleRemove = async (id: number) => {
    await removeItem(id);
    router.refresh();
  };

  const handleBuy = async () => {
    const confirmed = confirm("Are you sure you want to buy these items?");
    if (!confirmed) return;
    setLoading(true);
    await buyCart(cart);
    router.refresh();
    setLoading(false);
  };
  const total = cart.reduce(
    (sum: number, item: RowType) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="space-y-4">
      {cart.length === 0 ? (
        <p className="text-red-500 font-bold">Your cart is empty !! .</p>
      ) : (
        <>
          {cart.map((item: RowType) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-md shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.base64Image}
                  alt={item.product_name}
                  className="w-[64px] h-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.product_name}</p>
                  <p className="text-sm text-green-600">
                    Price: {item.price.toFixed(2)}
                  </p>

                  <p className="text-sm text-green-600">
                    Total: {(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="flex items-center mt-1 gap-2">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className={`px-2 py-1 border rounded text-sm ${
                        item.quantity <= 1
                          ? "bg-gray-600 text-gray-500 cursor-not-allowed"
                          : " hover:bg-gray-100"
                      }`}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleAdd(item.id)}
                      className="px-2 py-1 border rounded text-sm  hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:text-red-800 hover:bg-gray-100 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-xl font-semibold text-red-400">
              Total: {total.toFixed(2)}
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
