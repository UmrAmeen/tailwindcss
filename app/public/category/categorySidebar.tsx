import Link from "next/link";

export default function CategorySidebar({ categoryRows }: any) {
  return (
    <div className="w-64 h-screen bg-gray-300 border-r border-gray-500 p-4">
      <div className="flex flex-col gap-2">
        <Link
          href="/public/category"
          className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
        >
          Categories
        </Link>
        {categoryRows.map((row: any) => (
          <Link
            key={row.id}
            href={`/public/category/${row.slug}`}
            className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
          >
            {row.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
