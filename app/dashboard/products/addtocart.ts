"use server";
import { db } from "@/app/lib/db/database";
import { cart } from "@/supabase/migrations/schema";
import { eq } from "drizzle-orm";

export async function addToCart(productId: number, quantity: number) {
  const items = await db
    .select()
    .from(cart)
    .where(eq(cart.productId, productId))
    .execute();

  if (items.length > 0) {
    await db
      .update(cart)
      .set({ quantity })
      .where(eq(cart.productId, productId))
      .execute();
  } else {
    await db.insert(cart).values({ productId, quantity }).execute();
  }

  return { success: true };
}

export async function getCartQuantity(productId: number) {
  const items = await db
    .select({ quantity: cart.quantity })
    .from(cart)
    .where(eq(cart.productId, productId))
    .execute();

  const item = items[0];
  return item?.quantity ?? 0;
}
