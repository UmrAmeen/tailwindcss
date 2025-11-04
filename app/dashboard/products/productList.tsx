import Link from "next/link";
import ProductCard from "./productCard";
interface RowType {
  [key: string]: any;
}
export default function ProductList({ productRow }: any) {
  return (
    <div className="flex flex-wrap">
      {productRow.map((row: RowType) => (
        <Link key={row.id} href={`/dashboard/products/${row.slug}`}>
          <div>
            <ProductCard row={row} />
          </div>
        </Link>
      ))}
    </div>
  );
}
