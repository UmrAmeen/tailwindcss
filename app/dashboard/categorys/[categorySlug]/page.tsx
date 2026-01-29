import db from "@/app/lib/db/db";
import { notFound } from "next/navigation";
import CategoryList from "../categoryList";
import ProductList from "../../products/productList";
import { category, images, products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

function toBase64Image(image: unknown): string | null {
  if (!image) return null;
  return `data:image/jpeg;base64,${Buffer.from(image as Uint8Array).toString(
    "base64"
  )}`;
}

export default async function CategoryId({ params }: { params: any }) {
  const { categorySlug } = await params;

  const categoryRow = (
    await db
      .select()
      .from(category)
      .leftJoin(images, eq(category.imageId, images.id))
      .where(eq(category.slug, categorySlug))
  )[0];

  if (!categoryRow) notFound();

  const categoryId = categoryRow.category.id;

  const subcategories = await db
    .select()
    .from(category)
    .leftJoin(images, eq(category.imageId, images.id))
    .where(eq(category.parentId, categoryId));

  const subcategoriesWithImages = subcategories.map((row) => ({
    ...row.category,
    base64Image: toBase64Image(row.images?.image),
  }));

  if (subcategoriesWithImages.length > 0) {
    return <CategoryList categoryRows={subcategoriesWithImages} />;
  }

  const productRows = await db
    .select()
    .from(products)
    .leftJoin(images, eq(products.imageId, images.id))
    .where(eq(products.categoryId, categoryId));

  const productsWithImages = productRows.map((row) => ({
    ...row.products,
    base64Image: toBase64Image(row.images?.image),
  }));

  return <ProductList productRow={productsWithImages} />;
}
