"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "../lib/db/database";
import { images, products } from "@/supabase/migrations/schema";

export default async function CreateProductForm(
  prevFormState: any,
  formData: FormData
) {
  try {
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;
    const categoryId = Number(formData.get("categoryId"));
    const price = Number(formData.get("price"));
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const selectedImageId = formData.get("selectedImageId");
    let imageId: number | null = null;

    if (selectedImageId) {
      imageId = Number(selectedImageId);
    } else if (image && image.size > 0) {
      imageId = await insertImage(image);
    } else {
      return { success: false, error: "Please add an image." };
    }

    const result = await db
      .insert(products)
      .values({
        name,
        imageId,
        categoryId,
        price: price.toString(),
        slug,
        description,
      })
      .returning({ id: products.id });

    return result.length > 0
      ? { success: true, error: "" }
      : { success: false, error: "Something went wrong!" };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Internal server error." };
  }
}

export async function updateProductForm(
  prevFormState: any,
  formData: FormData
) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const image = formData.get("image") as File | null;
  const categoryId = Number(formData.get("categoryId"));
  const price = Number(formData.get("price"));
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;

  const productRows = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .execute();

  const existingProduct = productRows[0];

  if (!existingProduct) {
    return { success: false, error: "Product not found in database" };
  }

  let imageId = existingProduct.imageId;

  if (image && image.size > 0) {
    imageId = await insertImage(image);

    if (existingProduct.imageId) {
      await db
        .delete(images)
        .where(eq(images.id, existingProduct.imageId))
        .execute();
    }
  }

  const updatedRows = await db
    .update(products)
    .set({
      name,
      imageId,
      categoryId,
      price: price.toString(),
      slug,
      description,
    })
    .where(eq(products.id, id))
    .returning({ id: products.id })
    .execute();

  if (updatedRows.length > 0) {
    revalidatePath(`/dashboard/products/${slug}`);
    redirect(`/dashboard/products/${slug}`);
  } else {
    return { success: false, error: "No changes were made" };
  }
}

export async function insertImage(image: File): Promise<number> {
  const arrayBuffer = await image.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);
  const imageType = image.type;

  const result = await db
    .insert(images)
    .values({
      image: imageBuffer,
      imageType,
    })
    .returning({ id: images.id });

  return result[0].id;
}
