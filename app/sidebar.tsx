import Link from "next/link";

export default function SideBar() {
  return (
    <div>
      <ul>
        <Link href="/categorys">
          <li className="border border-solid border-black/10 hover:bg-gray-200 rounded-lg bg-gray-900 text-red-800 font-bold text-lg mt-5 mx-2.5 mb-2.5 text-center">
            categorys
          </li>
        </Link>
        <Link href="/products">
          <li className="border border-solid border-black/10 hover:bg-gray-200 rounded-lg bg-gray-900 text-red-800 font-bold text-lg mt-5 mx-2.5 mb-2.5 text-center">
            products
          </li>
        </Link>
        <Link href="/products/newProductForm">
          <li className="border border-solid border-black/10 hover:bg-gray-200 rounded-lg bg-gray-900 text-red-800 font-bold text-lg mt-5 mx-2.5 mb-2.5 text-center">
            NewProductForm
          </li>
        </Link>
        <Link href="/signUpForm">
          <li className="border border-solid border-black/10 hover:bg-gray-200 rounded-lg bg-gray-900 text-red-800 font-bold text-lg mt-5 mx-2.5 mb-2.5 text-center">
            signupForm
          </li>
        </Link>
      </ul>
    </div>
  );
}
