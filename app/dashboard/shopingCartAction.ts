"use server";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../lib/db/database";
import { cart, orders } from "@/supabase/migrations/schema";

const CART_PATH = "/dashbord/shoppingCart";

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

  const item = items[0];

  if (item && (item.quantity ?? 0) > 1) {
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
  await db.transaction(async (tx) => {
    for (const item of cartItems) {
      await tx
        .insert(orders)
        .values({
          productId: item.id,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        })
        .execute();
    }

    await tx.delete(cart).execute();
  });

  revalidatePath(CART_PATH);

  return { success: true, message: "Items purchased successfully." };
}

export async function getCartTotalQuantity() {
  const results = await db
    .select({
      total: sql<number>`SUM(${cart.quantity})`,
    })
    .from(cart)
    .execute();

  const result = results[0];

  return result?.total ?? 0;
}
