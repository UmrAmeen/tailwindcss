import { db } from "@/app/lib/db/database";
import { category, images, products } from "@/supabase/migrations/schema";
import { eq, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import CategoryList from "../categoryList";
import ProductList from "../../products/productList";
import CategorySidebar from "../categorySidebar";

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
  const { categorySlug } = params;

  const sidebarCategories = await db
    .select({
      id: category.id,
      name: category.name,
      slug: category.slug,
    })
    .from(category)
    .where(sql`${category.parentId} IS NULL`)
    .execute();

  const categoryData = await db
    .select({
      id: category.id,
      name: category.name,
      slug: category.slug,
      parentId: category.parentId,
    })
    .from(category)
    .where(eq(category.slug, categorySlug))
    .execute();

  if (!categoryData.length) notFound();

  const currentCategory = categoryData[0];

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
    .where(eq(category.parentId, currentCategory.id))
    .execute();

  const subcategoriesWithImages = subcategoriesData.map((row) => ({
    ...row,
    base64Image: toBase64Image(row.image, row.imageType),
  }));

  let productsWithImages: any[] = [];

  if (subcategoriesWithImages.length === 0) {
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
      .where(eq(products.categoryId, currentCategory.id))
      .execute();

    productsWithImages = productsData.map((row) => ({
      ...row,
      base64Image: toBase64Image(row.image, row.imageType),
    }));
  }

  return (
    <div className="flex min-h-screen">
      <CategorySidebar categoryRows={sidebarCategories} />

      <main className="flex-1 p-6">
        {subcategoriesWithImages.length > 0 ? (
          <CategoryList categoryRows={subcategoriesWithImages} />
        ) : (
          <ProductList productRow={productsWithImages} />
        )}
      </main>
    </div>
  );
}
