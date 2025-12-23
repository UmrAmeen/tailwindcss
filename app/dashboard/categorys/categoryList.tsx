import Link from "next/link";
import CategoryCard from "./categoryCard";

export default function CategoryList({ categoryRows }: any) {
  return (
    <div className="flex flex-wrap">
      {categoryRows.map((row:any) => (
        <Link key={row.id} href={`/dashboard/categorys/${row.slug}`}>
          <div>
            <CategoryCard row={row} />
          </div>
        </Link>
      ))}
    </div>
  );
}
