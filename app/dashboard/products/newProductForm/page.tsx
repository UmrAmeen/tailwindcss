// app/products/productForm.tsx
"use server";

import NewProductForm from "./newProductForm";
import db from "@/app/lib/db/db";
import { category, images } from "@/drizzle/schema";

export default async function ProductForm() {
  const categoryRows = await db.select().from(category);

  const imageRows = await db.select().from(images);

  const imageList = imageRows
    .map((row) => {
      if (!row.image || !(row.image instanceof Uint8Array)) return null;

      const base64 = Buffer.from(row.image).toString("base64");
      const url = `data:${row.imageType};base64,${base64}`;

      return { id: row.id, url };
    })
    .filter(Boolean);

  return <NewProductForm categoryRows={categoryRows} Images={imageList} />;
}
