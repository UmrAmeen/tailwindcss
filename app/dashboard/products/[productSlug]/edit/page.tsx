import db from "@/app/lib/sqlite/db";
import EditProductForm from "./editProduct";

interface RowType {
  [key: string]: any;
}
export default async function EditProduct({ params }: { params: any }) {
  const editProductForm = (await params).productSlug;
  const categoryRow = db
    .prepare(
      `SELECT * FROM category join images on category.image_id = images.id `
    )
    .all();
  const categoryRowsWithBase64Images = categoryRow.map((row: RowType) => {
    const base64Image = row.image.toString("base64");
    const { image, ...rest } = row;
    return {
      ...rest,
      base64Image: `data:image/jpeg;base64,${base64Image}`,
    };
  });
  const product = db
    .prepare(
      `
  SELECT products.*, images.image 
  FROM products
  JOIN images ON products.image_id = images.id
  WHERE products.slug = ?
`
    )
    .get(editProductForm);
  if (!product) {
    return <p>No product</p>;
  }

  const base64Image = `data:image/jpeg;base64,${Buffer.from(
    product.image
  ).toString("base64")}`;

  const { image, ...productWithoutImage } = product;

  const productWithImage = {
    ...productWithoutImage,
    base64Image,
  };
  return (
    <div>
      <EditProductForm
        categoryRows={categoryRowsWithBase64Images}
        product={productWithImage}
      />
    </div>
  );
}
