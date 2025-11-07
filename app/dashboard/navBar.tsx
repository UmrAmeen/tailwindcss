import { AlignJustify, Download, LogOut } from "feather-icons-react";
import ShoppingCartButton from "./shopingCartButton";
import { getCartTotalQuantity } from "./shopingCartAction";
import { CreateLogout } from "../signupAction";

export default async function NavBar() {
  const totalQuantity = await getCartTotalQuantity();

  return (
    <div className="h-12 bg-gradient-to-r from-blue-300 to-purple-300 text-white flex items-center justify-end px-4 shadow-md relative">
      <button className="relative flex text-black px-2 py-1 duration-300">
        <Download className="mr-2" size={24} />
      </button>
      <a href="/dashboard/shopingCart">
        <ShoppingCartButton totalQuantity={totalQuantity} />
      </a>
      <form action={CreateLogout}>
        <button
          type="submit"
          className="relative flex hover:bg-red-500 text-black px-2 py-1 duration-300 ml-2"
        >
          <LogOut className="mr-2" size={20} />
        </button>
      </form>
      <button className="relative flex hover:bg-red-500 text-black px-2 py-1 duration-300">
        <AlignJustify className="mr-2" size={24} />
      </button>
    </div>
  );
}
