import db from "@/app/lib/db/db";
import CategoryList from "./categoryList";
import { category, images } from "@/drizzle/schema";
import { eq, isNull } from "drizzle-orm";

export default async function Categorys() {
  const categoryRows = await db
    .select()
    .from(category)
    .leftJoin(images, eq(category.imageId, images.id))
    .where(isNull(category.parentId));

  const rowsWithBase64Images = categoryRows.map((row) => {
    const base64Image = row.images?.image
      ? `data:image/jpeg;base64,${Buffer.from(
          row.images.image as Buffer
        ).toString("base64")}`
      : null;

    return {
      ...row,
      base64Image,
    };
  });

  return (
    <>
      <CategoryList categoryRows={rowsWithBase64Images} />
    </>
  );
}
