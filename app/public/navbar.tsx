import { LogOut, ShoppingCart } from "feather-icons-react";
import Link from "next/link";
import { CreateLogout } from "./signupAction";
import { getCartTotalQuantity } from "./shopingCartAction";
import ThemeToggleWrapper from "./ThemeToggleWrapper";

export default async function Navbar() {
  const totalQuantity = await getCartTotalQuantity();

  return (
    <div className="flex h-16 items-center justify-between px-6 bg-orange-500 dark:bg-gray-900 shadow">
      <div className="text-xl font-bold text-white">MyStore</div>

      <div className="flex items-center space-x-4">
        <ThemeToggleWrapper />

        <Link href="/shopingCart">
          <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <ShoppingCart className="h-6 w-6 text-gray-800 dark:text-gray-200" />
            <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {totalQuantity}
            </span>
          </button>
        </Link>

        <form action={CreateLogout}>
          <button
            type="submit"
            className="flex hover:bg-red-500 text-white px-2 py-1 duration-300"
          >
            <LogOut className="mr-2" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
