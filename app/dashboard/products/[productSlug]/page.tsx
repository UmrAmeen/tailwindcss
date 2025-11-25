
import ProductIdCard from "../productIdCard";
import { getCartQuantity } from "../addtocart";
import { eq } from "drizzle-orm";
import { images, products } from "@/drizzle/schema";
import db from "@/app/lib/db/db";

export default async function ProductId({ params }: { params: any }) {
 const { productSlug } = await params;

  const product = await db
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
    .get();

  if (!product) {
    return <p>No product found for slug: {productSlug}</p>;
  }

  const base64Image = product.image
    ? `data:image/jpeg;base64,${Buffer.from(product.image as Uint8Array).toString(
        "base64"
      )}`
    : null;

  const { image, id, ...Product } = product;

  const quantity = await getCartQuantity(id);

  const productWithImage = {
    ...Product,
    id,
    base64Image,
    slug: productSlug,
  };

  return (
    <div>
      <ProductIdCard row={productWithImage} quantity={quantity} />
    </div>
  );
}
