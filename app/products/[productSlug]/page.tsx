import db from "@/app/lib/sqlite/db";
import ProductIdCard from "../productIdCard";
import { getCartQuantity } from "./addtocart";
export default async function ProductId({ params }: { params: any }) {
  const productSlug = (await params).productSlug;

  const product = db
    .prepare(
      `SELECT products.*, images.image 
       FROM products 
       LEFT JOIN images ON products.image_id = images.id 
       WHERE products.slug = ?`
    )
    .get(productSlug);

  if (!product) {
    return <p>No product found for slug: {productSlug}</p>;
  }

  const base64Image = `data:image/jpeg;base64,${Buffer.from(
    product.image
  ).toString("base64")}`;
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
