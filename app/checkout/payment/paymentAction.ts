"use server";
import { db } from "@/app/lib/db/database";
import { cart, products } from "@/supabase/migrations/schema";
import { getUserIdFromCookie } from "@/app/lib/getUserId";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { stripe } from "@/app/lib/stripe";

export async function handlePayment() {
  const userId = await getUserIdFromCookie();
  if (!userId) throw new Error("Not logged in");

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    throw new Error("NEXT_PUBLIC_APP_URL is not defined");
  }

  const cartItems = await db
    .select({
      productId: cart.productId,
      quantity: cart.quantity,
      price: products.price,
      name: products.name,
    })
    .from(cart)
    .leftJoin(products, eq(products.id, cart.productId))
    .where(eq(cart.userId, userId));

  if (cartItems.length === 0) {
    redirect("/public/category");
  }

  const lineItems = cartItems.map((item) => {
    if (!item.price) {
      throw new Error("Product price missing");
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name ?? "Product",
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: Number(item.quantity),
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment`,
    metadata: {
      userId,
    },
  });

  redirect(session.url!);
}
