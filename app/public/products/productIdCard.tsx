"use client";
import { useState } from "react";
import AddToCartButton from "./addToCartButton";
import Login from "../login/page";

export default function ProductIdCard({ row, quantity }: any) {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row border bg-sky-400 m-1 border-[8px] rounded-[10px] p-4">
      <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
        <img
          className="w-[140px] h-[140px] object-cover rounded-lg shadow-lg border border-white"
          src={row.base64Image}
          alt={row.name}
        />
      </div>

      <div className="flex flex-col justify-center text-left sm:ml-4">
        <h2 className="text-[20px] font-bold text-[#8d44ee]">{row.name}</h2>
        <p className="text-sm text-red-600 mt-1">{row.description}</p>
        <p className="text-red-600">{row.price}</p>

        <AddToCartButton
          productId={row.id}
          cartQuantity={quantity}
          onRequireLogin={() => setShowLogin(true)}
        />
      </div>
    </div>
  );
}
