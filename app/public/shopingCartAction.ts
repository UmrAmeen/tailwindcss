"use server";
import { eq, sql, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../lib/db/database";
import { cart, orders } from "@/supabase/migrations/schema";
import { getUserIdFromCookie } from "@/app/lib/getUserId";

const CART_PATH = "/dashboard/shopingCart";

export async function addItem(cartId: number) {
  await db
    .update(cart)
    .set({ quantity: sql`${cart.quantity} + 1` })
    .where(eq(cart.id, cartId))
    .execute();

  revalidatePath(CART_PATH);
}

export async function decreaseItem(cartId: number) {
  const items = await db
  .select({ quantity: cart.quantity })
  .from(cart)
  .where(eq(cart.id, cartId))
  .execute();

const quantity = items[0]?.quantity ?? 0;

if (quantity > 1) {
  await db
    .update(cart)
    .set({ quantity: sql`${cart.quantity} - 1` })
    .where(eq(cart.id, cartId))
    .execute();
}


  revalidatePath(CART_PATH);
}

export async function removeItem(cartId: number) {
  await db.delete(cart).where(eq(cart.id, cartId)).execute();
  revalidatePath(CART_PATH);
}

export async function buyCart(cartItems: any[]) {
  const userId = await getUserIdFromCookie(); 
  if (!userId) throw new Error("Not logged in");

  await db.transaction(async (tx) => {
    for (const item of cartItems) {
      await tx.insert(orders).values({
        productId: item.id,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        userId: userId, 
      });
    }

    await tx.delete(cart).where(eq(cart.userId, userId));
  });

  revalidatePath(CART_PATH);
}

export async function getCartTotalQuantity() {
  const userId = await getUserIdFromCookie();
  if (!userId) return 0;

  const result = await db
    .select({ total: sql<number>`SUM(${cart.quantity})` })
    .from(cart)
    .where(eq(cart.userId, userId))
    .execute();

  return result[0]?.total ?? 0;
}
