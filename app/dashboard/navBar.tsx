"use client";
import { AlignJustify, Download, LogOut } from "feather-icons-react";
import ShoppingCartButton from "./shopingCartButton";
import { useEffect, useState } from "react";
import { getCartTotalQuantity } from "./shopingCartAction";

export default function NavBar({ onLogout }: any) {
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    async function fetchQuantity() {
      const quantity = await getCartTotalQuantity();
      setTotalQuantity(quantity);
    }
    fetchQuantity();
  }, []);

  return (
    <div className="h-12 bg-green-300 text-white flex items-center justify-end px-4 shadow-md relative">
      <button className="relative flex text-black px-2 py-1 duration-300">
        <Download className="mr-2" size={24} />
      </button>
      <a href="/dashboard/shopingCart">
        <ShoppingCartButton totalQuantity={totalQuantity} />
      </a>
      <button
        onClick={onLogout}
        className="relative flex hover:bg-red-500 text-black px-2 py-1 duration-300 ml-2"
      >
        <LogOut className="mr-2" size={20} />
      </button>
      <button className="relative flex hover:bg-red-500 text-black px-2 py-1 duration-300">
        <AlignJustify className="mr-2" size={24} />
      </button>
    </div>
  );
}
