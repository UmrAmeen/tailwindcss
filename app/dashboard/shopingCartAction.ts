"use server";

import db from "@/app/lib/db/db";
import { cart, orders } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const CART_PATH = "/dashbord/shoppingCart";

export async function addItem(cartId: number) {
  await db
    .update(cart)
    .set({ quantity: sql`${cart.quantity} + 1` })
    .where(eq(cart.id, cartId));

  revalidatePath(CART_PATH);
}

export async function decreaseItem(cartId: number) {
  const item = await db
    .select({ quantity: cart.quantity })
    .from(cart)
    .where(eq(cart.id, cartId))
    .get();

  if (item && (item.quantity ?? 0) > 1) {
    await db
      .update(cart)
      .set({ quantity: sql`${cart.quantity} - 1` })
      .where(eq(cart.id, cartId));
  }

  revalidatePath(CART_PATH);
}

export async function removeItem(cartId: number) {
  await db.delete(cart).where(eq(cart.id, cartId));
  revalidatePath(CART_PATH);
}

export async function buyCart(cartItems: any[]) {
  await db.transaction(async (tx) => {
    for (const item of cartItems) {
      await tx.insert(orders).values({
        productId: item.id,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      });
    }

    await tx.delete(cart);
  });

  revalidatePath(CART_PATH);

  return { success: true, message: "Items purchased successfully." };
}

export async function getCartTotalQuantity() {
  const result = await db
    .select({
      total: sql<number>`SUM(${cart.quantity})`,
    })
    .from(cart)
    .get();

  return result?.total ?? 0;
}
