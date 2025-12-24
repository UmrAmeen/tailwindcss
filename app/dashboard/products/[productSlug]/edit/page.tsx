import { db } from "@/app/lib/db/database";
import EditProductForm from "./editProduct";
import { eq } from "drizzle-orm";
import { category, images, products } from "@/supabase/migrations/schema";

export default async function EditProduct({ params }: { params: any }) {
  const { productSlug } = await params; 

  const categoryRows = await db
    .select()
    .from(category)
    .leftJoin(images, eq(category.imageId, images.id));

  const categoryRowsWithBase64 = categoryRows.map((row) => {
    const base64Image = row.images?.image
      ? `data:image/jpeg;base64,${Buffer.from(
          row.images.image as Buffer
        ).toString("base64")}`
      : null;

    return {
      ...row.category,
      base64Image,
    };
  });

  const productRows = await db
    .select()
    .from(products)
    .leftJoin(images, eq(products.imageId, images.id))
    .where(eq(products.slug, productSlug));

  const productRow = productRows[0];

  if (!productRow) {
    return <p>No product</p>;
  }

  const productImage = productRow.images?.image
    ? `data:image/jpeg;base64,${Buffer.from(
        productRow.images.image as Buffer
      ).toString("base64")}`
    : null;

  const productWithImage = {
    ...productRow.products,
    base64Image: productImage,
  };

  return (
    <div>
      <EditProductForm
        categoryRows={categoryRowsWithBase64}
        product={productWithImage}
      />
    </div>
  );
}
