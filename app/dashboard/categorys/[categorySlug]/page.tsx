import db from "@/app/lib/db/db";
import { notFound } from "next/navigation";
import CategoryList from "../categoryList";
import ProductList from "../../products/productList";

interface RowType {
  [key: string]: any;
}
export default async function CategoryId({ params }: { params: any }) {
  const categorySlug = (await params).categorySlug;
  const categoryRow = db
    .prepare(
      `SELECT category.*,images.image FROM category LEFT JOIN images ON category.image_id = image_id WHERE category.slug = ?`
    )
    .get(categorySlug);
  if (!categoryRow) {
    notFound();
  }
  const subcategories = db
    .prepare(
      `SELECT category.*, images.*
     FROM category
     LEFT JOIN images ON category.image_id = images.id
     WHERE category.parent_id = ?`
    )
    .all(categoryRow.id.toString());

  const subcategoryRowsWithBase64Images = subcategories.map((row: RowType) => {
    const base64Image = row.image
      ? Buffer.from(row.image).toString("base64")
      : null;

    return {
      ...row,
      base64Image: base64Image ? `data:image/jpeg;base64,${base64Image}` : null,
    };
  });
  const productRows = db
    .prepare(
      `SELECT products.*,image AS image FROM products LEFT JOIN images ON products.image_id = images.id WHERE products.categoryId = ?`
    )
    .all(categoryRow.id.toString());
  const productRowsWithBase64Images = productRows.map((row: RowType) => {
    const base64Image = row.image
      ? Buffer.from(row.image).toString("base64")
      : null;

    return {
      ...row,
      base64Image: base64Image ? `data:image/jpeg;base64,${base64Image}` : null,
    };
  });
  return (
    <div>
      {subcategoryRowsWithBase64Images.length > 0 ? (
        <CategoryList categoryRows={subcategoryRowsWithBase64Images} />
      ) : (
        <ProductList productRow={productRowsWithBase64Images} />
      )}
    </div>
  );
}
