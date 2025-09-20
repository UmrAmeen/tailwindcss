import Link from "next/link";
import AddToCartButton from "./[productSlug]/addToCartButton";

export default function ProductIdCard({ row, quantity  }: any) {
  return (
    <div className="flex border bg-sky-400 m-1 border-[8px] rounded-[10px] p-4">
      <div className="mr-5">
        <img
          className="w-full h-[180px] rounded-[10px]"
          src={row.base64Image}
          alt={row.name}
        />
      </div>

      <div className="flex flex-col justify-center text-left">
        <h2 className="text-[25px] font-bold text-[#8d44ee]">{row.name}</h2>
        <p className="text-base text-red-600 mt-1">{row.description}</p>
        <p className="text-red-600">{row.price}</p>
        <Link href={`/products/${row.slug}/edit`}>
          <button className="border w-[100px] border-solid border-black/10 hover:bg-gray-400 rounded-lg bg-gray-800 text-red-800 font-bold text-lg text-center">
            Edit
          </button>
        </Link>
        <AddToCartButton productId={row.id}  cartQuantity={quantity} />
      </div>
    </div>
  );
}
