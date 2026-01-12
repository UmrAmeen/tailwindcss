import { LogOut, ShoppingCart } from "feather-icons-react";
import Link from "next/link";
import { CreateLogout } from "./signupAction";
import { getCartTotalQuantity } from "./shopingCartAction";

export default async function Navbar() {
  const totalQuantity = await getCartTotalQuantity();
  return (
    <div className="flex h-16 items-center justify-between px-6 bg-orange-500 shadow">
      <div className="text-xl font-bold">MyStore</div>

      <div className="flex items-center space-x-4">
        <div className="relative inline-block">
          <Link href="/public/shopingCart">
            <button className="relative p-2 rounded-full hover:bg-gray-200 transition">
              <ShoppingCart className="h-6 w-6 text-gray-800" />

              <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalQuantity}
              </span>
            </button>
          </Link>
        </div>

        <form action={CreateLogout}>
          <button
            type="submit"
            className="relative flex hover:bg-red-500 text-black px-2 py-1 duration-300 ml-2"
          >
            <LogOut className="mr-2" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
