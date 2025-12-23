import ProductIdCard from "../productIdCard";
import { getCartQuantity } from "../addtocart";
import { eq } from "drizzle-orm";
import { db } from "@/app/lib/db/database";
import { images, products } from "@/supabase/migrations/schema";

export default async function ProductId({ params }: { params: { productSlug: string } }) {
  const { productSlug } = params; 

  
  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      image: images.image,
      slug: products.slug,
    })
    .from(products)
    .leftJoin(images, eq(images.id, products.imageId))
    .where(eq(products.slug, productSlug))
    .execute(); 

  if (!rows || rows.length === 0) {
    return <p>No product found for slug: {productSlug}</p>;
  }

  const product = rows[0]; 

  
  const base64Image = product.image
    ? `data:image/jpeg;base64,${Buffer.from(product.image as Uint8Array).toString("base64")}`
    : null;

  
  const quantity = await getCartQuantity(product.id);

  const productWithImage = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    base64Image,
    slug: productSlug,
    quantity,
  };

  return (
    <div>
      <ProductIdCard row={productWithImage} quantity={quantity} />
    </div>
  );
}
