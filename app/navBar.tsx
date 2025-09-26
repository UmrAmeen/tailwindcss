import { AlignJustify, Download, ShoppingCart } from "feather-icons-react";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="h-12 bg-green-300 text-white flex items-center justify-end px-4 shadow-md relative">
      <button className="relative flex text-black px-2 py-1   duration-300">
        <Download className="mr-2" size={24} />
      </button>
      <Link href="/products/shopingCart">
        <div className="relative mx-2">
          <button className="relative flex text-black px-2 py-1  duration-300">
            <ShoppingCart className="mr-2" size={24} />

            <span className="absolute -top-1 -right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow">
              3
            </span>
          </button>
        </div>
      </Link>

      <button className="relative flex hover:bg-red-500  text-black px-2 py-1 duration-300">
        <AlignJustify className="mr-2" size={24} />
      </button>
    </div>
  );
}
