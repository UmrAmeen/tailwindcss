import { AlignJustify, Download, ShoppingCart } from "feather-icons-react";

export default function NavBar() {
  return (
    <div className="h-12 bg-green-300 text-white flex items-center justify-end px-4 shadow-md relative">
      <button className="relative flex text-black px-2 py-1  transition duration-300">
        <Download className="mr-2" size={24} />
      </button>
      <button className="relative flex  text-black px-2 py-1 transition duration-300">
        <ShoppingCart className="mr-2" size={24} />
      </button>
      <button className="relative flex  text-black px-2 py-1 transition duration-300">
        <AlignJustify className="mr-2" size={24} />
      </button>
    </div>
  );
}
