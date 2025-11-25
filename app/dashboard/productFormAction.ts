"use server";
import { revalidatePath } from "next/cache";
import db from "../lib/db/db";
import { redirect } from "next/navigation";
import { images, products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function CreateProductForm(
  prevFormState: any,
  formData: FormData
) {
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
    .values({ name, imageId, categoryId, price, slug, description })
    .returning({ id: products.id });

  return result.length > 0
    ? { success: true, error: "" }
    : { success: false, error: "Something went wrong!" };
}

export async function UpdateProductForm(
  prevFormState: any,
  formData: FormData
) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const image = formData.get("image") as File;
  const categoryId = Number(formData.get("categoryId"));
  const price = Number(formData.get("price"));
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;

  const existingProduct = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .get();

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
        .run();
    }
  }

  const updated = await db
    .update(products)
    .set({ name, imageId, categoryId, price, slug, description })
    .where(eq(products.id, id))
    .returning({ id: products.id });

  if (updated.length > 0) {
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

  const existing = await db
    .select()
    .from(images)
    .where(eq(images.image, imageBuffer))
    .get();

  if (existing) {
    return existing.id;
  }

  const result = await db
    .insert(images)
    .values({
      image: imageBuffer,
      imageType,
    })
    .returning({ id: images.id });

  return result[0].id;
}
