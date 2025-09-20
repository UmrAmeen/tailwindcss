import { ShoppingCart } from "feather-icons-react";

export default function CartButton({ quantity }: { quantity: number }) {
  return (
    <div className="h-12 bg-gray-600 text-white flex items-center justify-end px-4 shadow-md relative">
      <button
        className="relative flex items-center bg-cyan-300 text-white px-4 py-2 rounded-[15px] shadow-lg hover:bg-cyan-400 transition duration-300"
        aria-label="Cart"
      >
        <ShoppingCart className="mr-2" size={24} />

        {/* Quantity Badge */}
        {quantity > 0 && (
          <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-red text-xs font-bold px-2 py-[2px] rounded-full">
            {quantity}
          </span>
        )}
      </button>
    </div>
  );
}
