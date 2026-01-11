import CategoryPage from "./public/category/page";
import PublicLayout from "./public/layout";

export default function HomePage() {
  return (
    <PublicLayout>
      <h1 className="text-2xl text-center font-semibold uppercase tracking-wide text-gray-800">
        Category
      </h1>
      <CategoryPage />
    </PublicLayout>
  );
}
