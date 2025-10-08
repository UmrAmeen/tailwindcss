"use client";

import { useState } from "react";
import { addItem, buyCart, removeItem, subItem } from "../shopingCartAction";

interface RowType {
  [key: string]: any;
}

export default function ShoppingCart({ initialCart }: any) {
  const [cart, setCart] = useState(initialCart);
  const [loading, setLoading] = useState(false);

  const updateCartItem = (id: number, quantity: number) => {
    setCart((prev: RowType) =>
      prev.map((item: RowType) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleAdd = async (id: number) => {
    await addItem(id);
    const currentQty = cart.find((i: RowType) => i.id === id)?.quantity || 0;
    updateCartItem(id, currentQty + 1);
  };

  const handleSub = async (id: number) => {
    const currentQty = cart.find((i: RowType) => i.id === id)?.quantity || 0;
    if (currentQty <= 1) {
      await handleRemove(id);
    } else {
      await subItem(id);
      updateCartItem(id, currentQty - 1);
    }
  };

  const handleRemove = async (id: number) => {
    await removeItem(id);
    setCart((prev: RowType) => prev.filter((item: RowType) => item.id !== id));
  };

  const handleBuy = async () => {
    const confirmed = confirm("Are you sure you want to buy these items?");
    if (!confirmed) return;

    setLoading(true);
    await buyCart(cart);
    setCart([]);
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
                  className="w-16 h-16 object-cover rounded"
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
                      onClick={() => handleSub(item.id)}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleAdd(item.id)}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-xl font-semibold text-red-400">Total: {total.toFixed(2)}</p>

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
