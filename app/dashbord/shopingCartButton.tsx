import { ShoppingCart } from "feather-icons-react";

export default function ShoppingCartButton({ totalQuantity }: any) {
  return (
    <div>
      <div className="relative mx-2">
        <button className="relative flex text-black px-2 py-1  duration-300">
          <ShoppingCart className="mr-2" size={24} />

          <span className="absolute -top-1 -right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow">
            {totalQuantity}
          </span>
        </button>
      </div>
    </div>
  );
}
