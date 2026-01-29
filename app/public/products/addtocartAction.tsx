"use server";
import { db } from "@/app/lib/db/database";
import { cart } from "@/supabase/migrations/schema";
import { eq, and } from "drizzle-orm";
import { getUserIdFromCookie } from "@/app/lib/getUserId";

export async function addToCart(productId: number, quantity: number) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return { success: false, error: "Not logged in" };
  }
  const existing = await db
    .select()
    .from(cart)
    .where(and(eq(cart.productId, productId), eq(cart.userId, userId)))
    .execute();

  if (existing.length > 0) {
    await db
      .update(cart)
      .set({ quantity })
      .where(eq(cart.id, existing[0].id))
      .execute();
  } else {
    await db
      .insert(cart)
      .values({
        productId,
        quantity,
        userId,
      })
      .execute();
  }

  return { success: true };
}

export async function getCartQuantity(productId: number): Promise<number> {
  const userId = await getUserIdFromCookie();
  if (!userId) return 0;

  const items = await db
    .select({ quantity: cart.quantity })
    .from(cart)
    .where(and(eq(cart.productId, productId), eq(cart.userId, userId)))
    .execute();

  return items[0]?.quantity ?? 0;
}
