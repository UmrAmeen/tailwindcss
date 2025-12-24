import { db } from "@/app/lib/db/database";
import { category, images } from "@/supabase/migrations/schema";
import { sql } from "drizzle-orm";
import CategoryList from "./categoryList";

export default async function CategoryPage() {
  const data = await db
    .select({
      id: category.id,
      name: category.name,
      parentId: category.parentId,
      slug: category.slug,
      image: images.image,
      imageType: images.imageType,
    })
    .from(category)
    .leftJoin(images, sql`${images.id} = ${category.imageId}`)
    .where(sql`${category.parentId} IS NULL`);

  const categoryRows = data.map((row) => ({
    ...row,
    base64Image: row.image
      ? `data:${row.imageType};base64,${row.image.toString("base64")}`
      : null,
  }));

  console.log("data");
  return (
    <div>
      <CategoryList categoryRows={categoryRows} />
    </div>
  );
}

// DATABASE_URL=postgresql://postgres:umar0766708388@db.vugvefacuygjeupjkmku.supabase.co:5432/postgres
// NEXT_PUBLIC_SUPABASE_URL=https://vugvefacuygjeupjkmku.supabase.co
// NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_MasCU7jcPQeyQ1qlWQAigA_MwVYguND
