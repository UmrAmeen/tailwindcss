import Link from "next/link";
import CategoryCard from "./categoryCard";

export default function CategoryList({ categoryRows }: any) {
    
    interface RowType {
  [key: string]: any;
}
  return (
    <div className="flex flex-wrap">
    
      {categoryRows.map((row:RowType) => (
        <Link key={row.id} href={`/categorys/${row.slug}`} >
          <div >
            <CategoryCard row={row} />
          </div>
          
        </Link>
      ))}
    </div>
  );
}
