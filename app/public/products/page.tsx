import { eq } from "drizzle-orm";
import { products, images } from "@/supabase/migrations/schema";
import { db } from "@/app/lib/db/database";
import ProductList from "./productList";

function toBase64Image(
  image: Buffer | Uint8Array | null | undefined,
  type: string = "image/jpeg"
): string | null {
  if (!image) return null;
  const base64 = Buffer.isBuffer(image)
    ? image.toString("base64")
    : Buffer.from(image).toString("base64");
  return `data:${type};base64,${base64}`;
}

export default async function Products() {
  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      slug: products.slug,
      description: products.description,
      image: images.image,
      imageType: images.imageType,
    })
    .from(products)
    .leftJoin(images, eq(images.id, products.imageId))
    .execute();

  const rowsWithBase64Images = rows.map((row) => ({
    id: row.id,
    name: row.name,
    price: row.price,
    slug: row.slug,
    description: row.description,
    base64Image: toBase64Image(row.image, row.imageType || "image/jpeg"),
  }));

  return (
    <div className="flex flex-wrap">
      <ProductList productRow={rowsWithBase64Images} />
    </div>
  );
}
