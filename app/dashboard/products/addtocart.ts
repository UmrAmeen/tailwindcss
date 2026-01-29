"use server";

import db from "@/app/lib/db/db";
import { cart } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function addToCart(productId: number, quantity: number) {
  const cartItem = await db
    .select()
    .from(cart)
    .where(eq(cart.productId, productId))
    .get();

  if (cartItem) {
    await db
      .update(cart)
      .set({ quantity })
      .where(eq(cart.productId, productId));
  } else {
    await db.insert(cart).values({ productId, quantity });
  }

  return { success: true };
}

export async function getCartQuantity(productId: number) {
  const item = await db
    .select({ quantity: cart.quantity })
    .from(cart)
    .where(eq(cart.productId, productId))
    .get();

  return item?.quantity ?? 0;
}
