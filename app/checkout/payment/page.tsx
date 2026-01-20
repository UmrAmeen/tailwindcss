import { db } from "@/app/lib/db/database";
import { checkoutSessions, cart } from "@/supabase/migrations/schema";
import { getUserIdFromCookie } from "@/app/lib/getUserId";
import { eq, desc } from "drizzle-orm";
import PaymentForm from "./payment";

export default async function PaymentPage() {
  const userId = await getUserIdFromCookie();
  if (!userId) return <p>Please login</p>;

  const billing = await db
    .select()
    .from(checkoutSessions)
    .where(eq(checkoutSessions.userId, userId))
    .orderBy(desc(checkoutSessions.createdAt))
    .limit(1);

  const cartItems = await db
    .select()
    .from(cart)
    .where(eq(cart.userId, userId));

  return <PaymentForm billing={billing[0]} cartItems={cartItems} />;
}
