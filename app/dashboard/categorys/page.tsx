import { supabase } from "@/app/lib/supabaseClient";
import CategoryList from "./categoryList";

export default async function Categorys() {
  const { data, error } = await supabase
    .from("category")
    .select(
      `
      *,
      images (
        id,
        url
      )
    `
    )
    .is("parent_id", null);

  if (error) {
    console.error("Error fetching categories:", error);
    return <p>Error loading categories</p>;
  }

  if (!data || data.length === 0) {
    return <p>No categories found.</p>;
  }

  const categoryRows = data.map((row: any) => ({
    ...row,
    imageUrl: row.images?.url || "/placeholder.png",
  }));

  return <CategoryList categoryRows={categoryRows} />;
}
