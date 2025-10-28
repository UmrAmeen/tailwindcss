"use server";
import { AlignJustify, Download } from "feather-icons-react";
import ShoppingCartButton from "./shopingCartButton";
import { getCartTotalQuantity } from "./shopingCartAction";

export default async function NavBar() {
  const totalQuantity = await getCartTotalQuantity();

  return (
    <div className="h-12 bg-green-300 text-white flex items-center justify-end px-4 shadow-md relative">
      <button className="relative flex text-black px-2 py-1 duration-300">
        <Download className="mr-2" size={24} />
      </button>
      <a href="/shopingCart">
        <ShoppingCartButton totalQuantity={totalQuantity} />
      </a>
      <button className="relative flex hover:bg-red-500 text-black px-2 py-1 duration-300">
        <AlignJustify className="mr-2" size={24} />
      </button>
    </div>
  );
}
