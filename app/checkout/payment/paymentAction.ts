"use server";
import { db } from "@/app/lib/db/database";
import { cart, orders, products } from "@/supabase/migrations/schema";
import { getUserIdFromCookie } from "@/app/lib/getUserId";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function handlePayment(_formData: FormData) {
  const userId = await getUserIdFromCookie();
  if (!userId) throw new Error("Not logged in");

  const cartItems = await db
    .select({
      id: cart.id,
      productId: cart.productId,
      quantity: cart.quantity,
      price: products.price,
    })
    .from(cart)
    .leftJoin(products, eq(products.id, cart.productId))
    .where(eq(cart.userId, userId));

  if (cartItems.length === 0) {
    redirect("/public/category");
  }

  await db.transaction(async (tx) => {
    for (const item of cartItems) {
      await tx.insert(orders).values({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        totalPrice: Number(item.price) * Number(item.quantity),
        userId,
      });
    }

    await tx.delete(cart).where(eq(cart.userId, userId));
  });

  redirect("/success");
}
