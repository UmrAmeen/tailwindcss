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

  
  return (
    <div>
      <CategoryList categoryRows={categoryRows} />
    </div>
  );
}


