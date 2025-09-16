import db from "@/app/lib/sqlite/db";
import ProductIdCard from "../productIdCard";

export default async function ProductId({ params }: { params: any }) {
  const productSlug = (await params).productSlug;
  const imageId = db
    .prepare(
      `SELECT products.*, images.image FROM products LEFT JOIN images ON  products.image_id = images.id WHERE products.slug =?`
    )
    .get(productSlug);
  if (!imageId) {
    return <p>No product found for slug: {productSlug}</p>;
  }
  const base64Image = `data:image/jpeg;base64,${Buffer.from(
    imageId.image
  ).toString("base64")}`;
  const { image, ...restProduct } = imageId;

  const productWithImage = {
    ...restProduct,
    base64Image,
  };

  return (
    <div>
      <ProductIdCard row={productWithImage}/>
    </div>
  );
}
