import { eq } from "drizzle-orm";
import db from "@/app/lib/db/db";
import { products, images } from "@/drizzle/schema";
import ProductList from "./productList";

function toBase64Image(image: unknown): string | null {
  if (!image) return null;
  return `data:image/jpeg;base64,${Buffer.from(image as Uint8Array).toString("base64")}`;
}

export default async function Products() {
  const rows = await db
    .select()
    .from(products)
    .leftJoin(images, eq(products.imageId, images.id));

  const rowsWithBase64Images = rows.map((row) => {
    const product = row.products;
    const imageBuffer = row.images?.image;

    return {
      ...product,
      base64Image: toBase64Image(imageBuffer),
    };
  });

  return (
    <div className="flex flex-wrap">
      <ProductList productRow={rowsWithBase64Images} />
    </div>
  );
}
