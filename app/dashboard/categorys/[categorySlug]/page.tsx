import { db } from "@/app/lib/db/database";
import { category, images, products } from "@/supabase/migrations/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import CategoryList from "../categoryList";
import ProductList from "../../products/productList";

function toBase64Image(
  image: Buffer | string | null | undefined,
  type: string | null | undefined
): string | null {
  if (!image || !type) return null;
  const base64 = Buffer.isBuffer(image) ? image.toString("base64") : image;
  return `data:${type};base64,${base64}`;
}

interface Params {
  params: { categorySlug: string };
}

export default async function CategoryPage({ params }: Params) {
  const { categorySlug } = await Promise.resolve(params);

  const categoryData = await db
    .select({
      id: category.id,
      name: category.name,
      slug: category.slug,
      parentId: category.parentId,
      image: images.image,
      imageType: images.imageType,
    })
    .from(category)
    .leftJoin(images, eq(images.id, category.imageId))
    .where(eq(category.slug, categorySlug))
    .execute();

  if (!categoryData || categoryData.length === 0) notFound();

  const mainCategory = categoryData[0];
  const categoryId = mainCategory.id;

  const subcategoriesData = await db
    .select({
      id: category.id,
      name: category.name,
      slug: category.slug,
      parentId: category.parentId,
      image: images.image,
      imageType: images.imageType,
    })
    .from(category)
    .leftJoin(images, eq(images.id, category.imageId))
    .where(eq(category.parentId, categoryId))
    .execute();

  const subcategoriesWithImages = subcategoriesData.map((row) => ({
    ...row,
    base64Image: toBase64Image(row.image, row.imageType),
  }));

  if (subcategoriesWithImages.length > 0) {
    return <CategoryList categoryRows={subcategoriesWithImages} />;
  }

  const productsData = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      categoryId: products.categoryId,
      price: products.price,
      description: products.description,
      image: images.image,
      imageType: images.imageType,
    })
    .from(products)
    .leftJoin(images, eq(images.id, products.imageId))
    .where(eq(products.categoryId, categoryId))
    .execute();

  const productsWithImages = productsData.map((row) => ({
    ...row,
    base64Image: toBase64Image(row.image, row.imageType),
  }));

  return <ProductList productRow={productsWithImages} />;
}
