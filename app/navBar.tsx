import { AlignJustify, Download, ShoppingCart } from "feather-icons-react";
import Link from "next/link";
import ShoppingCartButton from "./shopingCartButton";
import db from "./lib/sqlite/db";

export default function NavBar() {
  const totalQuantity =
    db.prepare(`SELECT SUM(quantity) as total FROM cart`).get().total || 0;

  return (
    <div className="h-12 bg-green-300 text-white flex items-center justify-end px-4 shadow-md relative">
      <button className="relative flex text-black px-2 py-1   duration-300">
        <Download className="mr-2" size={24} />
      </button>
      <Link href="/shopingCart">
        <ShoppingCartButton totalQuantity={totalQuantity} />
      </Link>

      <button className="relative flex hover:bg-red-500  text-black px-2 py-1 duration-300">
        <AlignJustify className="mr-2" size={24} />
      </button>
    </div>
  );
}
